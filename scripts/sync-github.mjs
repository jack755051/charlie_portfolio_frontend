import { readFileSync, writeFileSync, existsSync } from 'node:fs'
import { resolve } from 'node:path'
import { parse as parseYaml } from 'yaml'

const root = process.cwd()
const outputPath = resolve(root, 'assets/data/github-projects.json')
const overridesPath = resolve(root, 'assets/data/github-projects.overrides.json')
const username = process.env.GITHUB_USERNAME || 'jack755051'
const endpoint = 'https://api.github.com/graphql'
const token = process.env.GITHUB_TOKEN // optional; public repos work without

const PORTFOLIO_TOPIC = 'portfolio'

const query = `
query UserRepos($login: String!) {
  user(login: $login) {
    repositories(first: 100, privacy: PUBLIC, isFork: false, orderBy: {field: PUSHED_AT, direction: DESC}) {
      nodes {
        name
        description
        url
        homepageUrl
        isArchived
        stargazerCount
        createdAt
        pushedAt
        defaultBranchRef { name }
        primaryLanguage { name }
        languages(first: 10, orderBy: {field: SIZE, direction: DESC}) {
          nodes { name }
        }
        repositoryTopics(first: 20) {
          nodes { topic { name } }
        }
        releases(first: 1, orderBy: {field: CREATED_AT, direction: DESC}) {
          nodes { tagName createdAt }
        }
      }
    }
  }
}
`

const readJson = path => {
  try {
    return JSON.parse(readFileSync(path, 'utf8'))
  } catch {
    return null
  }
}

const pad2 = n => String(n).padStart(2, '0')

const formatMonth = iso => {
  const d = new Date(iso)
  return `${d.getUTCFullYear()}.${pad2(d.getUTCMonth() + 1)}`
}

const formatDuration = (createdAt, pushedAt) => {
  const start = formatMonth(createdAt)
  const endDate = new Date(pushedAt)
  const now = new Date()
  const daysSincePush = (now.getTime() - endDate.getTime()) / (1000 * 60 * 60 * 24)
  // 若近 90 天內仍有更新 → 視為 Now
  const end = daysSincePush <= 90 ? 'Now' : formatMonth(pushedAt)
  return `${start} ~ ${end}`
}

const MANIFEST_ALLOWED_STATUSES = new Set(['wip', 'done', 'archived'])

const fetchManifest = async (owner, repoName, defaultBranch) => {
  const branch = defaultBranch || 'main'
  const url = `https://raw.githubusercontent.com/${owner}/${repoName}/${branch}/repo.manifest.yaml`
  try {
    const res = await fetch(url, {
      headers: { 'User-Agent': 'charlie-portfolio-sync' },
    })
    if (!res.ok) return null
    const text = await res.text()
    return parseYaml(text)
  } catch {
    return null
  }
}

const fetchManifests = async (repos, owner) => {
  const results = await Promise.allSettled(
    repos.map(repo => {
      const branch = repo.defaultBranchRef?.name || 'main'
      return fetchManifest(owner, repo.name, branch)
    })
  )
  const map = {}
  repos.forEach((repo, i) => {
    const result = results[i]
    if (result.status === 'fulfilled' && result.value) {
      map[repo.name] = result.value
    }
  })
  return map
}

const mergeTechnologies = (manifestStack, githubLanguages) => {
  const seen = new Set()
  const techs = []

  // manifest stack 優先（框架級名稱）
  for (const name of manifestStack || []) {
    const key = name.toLowerCase()
    if (!seen.has(key)) {
      seen.add(key)
      techs.push({ name, icon: null, category: '技術棧' })
    }
  }

  // GitHub languages 補後面（程式語言級別）
  for (const lang of githubLanguages || []) {
    const key = lang.name.toLowerCase()
    if (!seen.has(key)) {
      seen.add(key)
      techs.push({ name: lang.name, icon: null, category: '程式語言' })
    }
  }

  return techs.slice(0, 8)
}

const inferStatus = (repo, topicSet, override, manifest) => {
  if (override?.force_status) return override.force_status
  if (repo.isArchived) return 'archived'

  // manifest 宣告優先於 topic heuristic
  if (manifest?.status && MANIFEST_ALLOWED_STATUSES.has(manifest.status)) {
    return manifest.status
  }

  if (topicSet.has('status-archived')) return 'archived'
  if (topicSet.has('status-done')) return 'done'
  if (topicSet.has('status-wip')) return 'wip'

  // fallback：近 90 天內有 release 視為 done
  const latestRelease = repo.releases?.nodes?.[0]
  if (latestRelease?.createdAt) {
    const daysAgo = (Date.now() - Date.parse(latestRelease.createdAt)) / (1000 * 60 * 60 * 24)
    if (daysAgo <= 90) return 'done'
  }
  return 'wip'
}

const mapRepoToProject = (repo, overridesMap, manifestMap) => {
  const topicSet = new Set(
    (repo.repositoryTopics?.nodes || []).map(n => n.topic?.name).filter(Boolean)
  )
  const override = overridesMap[repo.name] || {}
  const manifest = manifestMap[repo.name] || null
  const hasPortfolioTopic = topicSet.has(PORTFOLIO_TOPIC)
  const status = inferStatus(repo, topicSet, override, manifest)
  const isVisible = hasPortfolioTopic && override.hide !== true

  // 合併優先序：overrides > manifest > GitHub API
  const title = override.title_en || manifest?.name || repo.name
  const titleZh = override.title_zh || null
  const description = override.description_en || manifest?.summary || repo.description || ''
  const descriptionZh = override.description_zh || manifest?.summary_zh || null

  // stack + languages merge 去重（stack 優先排前面，languages 補後面）
  const technologies = manifest?.stack
    ? mergeTechnologies(manifest.stack, (repo.languages?.nodes || []).slice(0, 6))
    : (repo.languages?.nodes || [])
        .slice(0, 6)
        .map(lang => ({ name: lang.name, icon: null, category: '程式語言' }))

  const tags = Array.isArray(manifest?.tags) ? manifest.tags : []

  return {
    id: repo.name,
    title,
    titleZh,
    description,
    descriptionZh,
    role: override.role || null,
    duration: formatDuration(repo.createdAt, repo.pushedAt),
    technologies,
    tags,
    status,
    type: 'personal',
    homepage: repo.homepageUrl || null,
    repoUrl: repo.url,
    stars: repo.stargazerCount || 0,
    lastUpdatedAt: repo.pushedAt,
    pinned: override.pinned === true,
    isVisible,
    ...(override.screenshots ? { screenshots: override.screenshots } : {}),
  }
}

const fetchRepos = async () => {
  const headers = {
    'Content-Type': 'application/json',
    Accept: 'application/vnd.github+json',
    'User-Agent': 'charlie-portfolio-sync',
  }
  if (token) headers.Authorization = `Bearer ${token}`

  const response = await fetch(endpoint, {
    method: 'POST',
    headers,
    body: JSON.stringify({ query, variables: { login: username } }),
  })

  if (!response.ok) {
    throw new Error(`GitHub GraphQL request failed: ${response.status} ${response.statusText}`)
  }

  const payload = await response.json()
  if (payload.errors?.length) {
    throw new Error(`GitHub GraphQL returned ${payload.errors.length} error(s).`)
  }

  const nodes = payload?.data?.user?.repositories?.nodes
  if (!Array.isArray(nodes)) {
    throw new Error(`Unexpected payload for user ${username}`)
  }
  return nodes
}

const loadOverrides = () => {
  if (!existsSync(overridesPath)) return {}
  const overrides = readJson(overridesPath)
  if (!overrides || typeof overrides !== 'object') return {}
  return overrides.entries || {}
}

const buildSnapshot = (repos, previousSnapshot, manifestMap) => {
  const overridesMap = loadOverrides()
  const projects = repos
    .map(repo => mapRepoToProject(repo, overridesMap, manifestMap))
    .filter(project => project.isVisible)
    .sort((a, b) => {
      if (a.pinned !== b.pinned) return a.pinned ? -1 : 1
      return (b.lastUpdatedAt || '').localeCompare(a.lastUpdatedAt || '')
    })

  const now = new Date().toISOString()

  return {
    schema_version: 1,
    source: 'github',
    sourceFetchedAt: now,
    isStale: false,
    staleAt: null,
    version: Number(previousSnapshot?.version || 0) + 1,
    projects,
  }
}

const markStale = previousSnapshot => {
  if (!previousSnapshot) {
    throw new Error('Provider failed and no previous github-projects.json snapshot exists.')
  }
  return {
    ...previousSnapshot,
    isStale: true,
    staleAt: new Date().toISOString(),
  }
}

const main = async () => {
  const previousSnapshot = readJson(outputPath)

  try {
    const repos = await fetchRepos()

    // 平行 fetch 每個 repo 的 repo.manifest.yaml（404 靜默略過）
    const manifestMap = await fetchManifests(repos, username)
    const manifestCount = Object.keys(manifestMap).length
    if (manifestCount > 0) {
      console.log(`📦 Loaded repo.manifest.yaml from ${manifestCount} repo(s).`)
    }

    const snapshot = buildSnapshot(repos, previousSnapshot, manifestMap)
    writeFileSync(outputPath, `${JSON.stringify(snapshot, null, 2)}\n`)
    console.log(`✅ Synced ${snapshot.projects.length} GitHub project(s) for ${username}.`)

    // 輸出未打 portfolio topic 的 repo 供使用者參考
    const unlabelled = repos
      .filter(r => !(r.repositoryTopics?.nodes || []).some(n => n.topic?.name === PORTFOLIO_TOPIC))
      .map(r => r.name)
    if (unlabelled.length) {
      console.log('ℹ️  Repos without the `portfolio` topic (not included):')
      unlabelled.forEach(n => console.log(`   - ${n}`))
    }
  } catch (error) {
    const staleSnapshot = markStale(previousSnapshot)
    writeFileSync(outputPath, `${JSON.stringify(staleSnapshot, null, 2)}\n`)
    console.warn(error instanceof Error ? error.message : 'Unknown GitHub sync error.')
    console.warn('⚠️  Kept previous snapshot with isStale=true.')
  }
}

await main()
