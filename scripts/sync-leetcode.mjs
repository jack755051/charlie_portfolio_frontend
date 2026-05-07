import { readFileSync, writeFileSync, mkdirSync, existsSync } from 'node:fs'
import { resolve } from 'node:path'

const root = process.cwd()
const outputPath = resolve(root, 'assets/data/leetcode-profile.json')
const solutionsDir = resolve(root, 'content/solutions')
const username = process.env.LEETCODE_USERNAME || 'jack755051'
const sessionCookie = process.env.LEETCODE_SESSION || ''
const endpoint = 'https://leetcode.com/graphql'

// ─── GraphQL Queries ───

const profileQuery = `
query userProfile($username: String!) {
  allQuestionsCount {
    difficulty
    count
  }
  matchedUser(username: $username) {
    username
    submissionCalendar
    submitStats {
      acSubmissionNum {
        difficulty
        count
        submissions
      }
    }
    tagProblemCounts {
      advanced {
        tagName
        problemsSolved
      }
      intermediate {
        tagName
        problemsSolved
      }
      fundamental {
        tagName
        problemsSolved
      }
    }
  }
  recentAcSubmissionList(username: $username, limit: 20) {
    id
    title
    titleSlug
    timestamp
    lang
  }
}
`

const submissionDetailsQuery = `
query submissionDetails($submissionId: Int!) {
  submissionDetails(submissionId: $submissionId) {
    code
    lang {
      name
    }
    runtimeDisplay
    memoryDisplay
    runtimePercentile
    memoryPercentile
    question {
      titleSlug
      title
      difficulty
    }
  }
}
`

// ─── Helpers ───

const readPreviousProfile = () => {
  try {
    return JSON.parse(readFileSync(outputPath, 'utf8'))
  } catch {
    return null
  }
}

const pad2 = value => String(value).padStart(2, '0')

const formatDate = timestamp => {
  const date = new Date(Number(timestamp) * 1000)
  return `${date.getUTCFullYear()}-${pad2(date.getUTCMonth() + 1)}-${pad2(date.getUTCDate())}`
}

const formatShortDate = timestamp => {
  const date = new Date(Number(timestamp) * 1000)
  return `${pad2(date.getUTCMonth() + 1)}/${pad2(date.getUTCDate())}`
}

const getDifficultyCount = (items, difficulty) => {
  const item = items.find(entry => entry.difficulty === difficulty)
  return Number(item?.count || 0)
}

const clampPct = value => Math.max(0, Math.min(100, Math.round(value)))

const normalizeCalendar = calendar => {
  if (!calendar) return []
  const parsed = typeof calendar === 'string' ? JSON.parse(calendar || '{}') : calendar
  return Object.entries(parsed)
    .map(([timestamp, count]) => [formatDate(timestamp), Number(count)])
    .sort((a, b) => a[0].localeCompare(b[0]))
}

const normalizeSkills = tagProblemCounts => {
  if (!tagProblemCounts) return []
  const tags = [
    ...(tagProblemCounts.advanced || []),
    ...(tagProblemCounts.intermediate || []),
    ...(tagProblemCounts.fundamental || []),
  ]
  return tags
    .filter(item => item?.tagName && Number(item.problemsSolved) > 0)
    .sort((a, b) => Number(b.problemsSolved) - Number(a.problemsSolved))
    .slice(0, 6)
    .map(item => ({ name: item.tagName, value: Number(item.problemsSolved) }))
}

// ─── Profile Sync (existing) ───

const normalizeProfile = (payload, previousProfile) => {
  const data = payload?.data
  const matchedUser = data?.matchedUser
  if (!matchedUser) throw new Error(`LeetCode user not found: ${username}`)

  const allQuestions = data.allQuestionsCount || []
  const solved = matchedUser.submitStats?.acSubmissionNum || []
  const totalSolved = getDifficultyCount(solved, 'All')
  const totalQuestions = getDifficultyCount(allQuestions, 'All')
  const easy = getDifficultyCount(solved, 'Easy')
  const medium = getDifficultyCount(solved, 'Medium')
  const hard = getDifficultyCount(solved, 'Hard')
  const totalEasy = getDifficultyCount(allQuestions, 'Easy')
  const totalMedium = getDifficultyCount(allQuestions, 'Medium')
  const totalHard = getDifficultyCount(allQuestions, 'Hard')
  const now = new Date()
  const expiresAt = new Date(now.getTime() + 25 * 60 * 60 * 1000)

  return {
    schema_version: 1,
    id: `leetcode:${matchedUser.username}`,
    username: matchedUser.username,
    totalSolved,
    totalQuestions,
    easy, medium, hard,
    easyPct: totalEasy > 0 ? clampPct((easy / totalEasy) * 100) : 0,
    mediumPct: totalMedium > 0 ? clampPct((medium / totalMedium) * 100) : 0,
    hardPct: totalHard > 0 ? clampPct((hard / totalHard) * 100) : 0,
    calendar: normalizeCalendar(matchedUser.submissionCalendar),
    recent: (data.recentAcSubmissionList || []).map(item => ({
      title: item.title,
      titleSlug: item.titleSlug,
      submissionId: item.id,
      time: formatShortDate(item.timestamp),
      timestamp: Number(item.timestamp),
      status: 'Accepted',
      lang: item.lang,
      isSuccess: true,
    })),
    skills: normalizeSkills(matchedUser.tagProblemCounts),
    source: 'provider',
    sourceFetchedAt: now.toISOString(),
    expiresAt: expiresAt.toISOString(),
    isStale: false,
    version: Number(previousProfile?.version || 0) + 1,
  }
}

const markStale = previousProfile => {
  if (!previousProfile) {
    throw new Error('Provider failed and no previous leetcode-profile.json snapshot exists.')
  }
  const expiresAt = new Date(Date.now() + 25 * 60 * 60 * 1000)
  return { ...previousProfile, source: 'stale-cache', expiresAt: expiresAt.toISOString(), isStale: true }
}

// ─── HTTP ───

const baseHeaders = {
  'Content-Type': 'application/json',
  'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
  Referer: 'https://leetcode.com/',
  Origin: 'https://leetcode.com',
}

const fetchGraphQL = async (query, variables, withSession = false) => {
  const headers = { ...baseHeaders }
  if (withSession && sessionCookie) {
    headers.Cookie = `LEETCODE_SESSION=${sessionCookie}`
  }
  const response = await fetch(endpoint, {
    method: 'POST',
    headers,
    body: JSON.stringify({ query, variables }),
  })
  if (!response.ok) throw new Error(`GraphQL request failed: ${response.status}`)
  const payload = await response.json()
  if (payload.errors?.length) throw new Error(`GraphQL returned ${payload.errors.length} error(s).`)
  return payload
}

// ─── Solution Sync (new) ───

const readExistingFrontmatter = (filePath) => {
  try {
    const content = readFileSync(filePath, 'utf8')
    const match = content.match(/^---\n([\s\S]*?)\n---/)
    if (!match) return null
    // Simple YAML parse for our known fields
    const yaml = match[1]
    const get = (key) => {
      const re = new RegExp(`^${key}:\\s*\\|\\n([\\s\\S]*?)(?=^\\w|^$)`, 'm')
      const m = yaml.match(re)
      return m ? m[1].replace(/^ {2}/gm, '').trim() : null
    }
    return { problem: get('problem') }
  } catch {
    return null
  }
}

const buildSolutionMd = (detail, existingProblem) => {
  const d = detail.submissionDetails
  const q = d.question
  const difficulty = (q.difficulty || 'unknown').toLowerCase()
  const lang = (d.lang?.name || 'typescript').toLowerCase()

  // Preserve manually written problem, fallback to placeholder
  const problem = existingProblem || '（待填寫題目描述）'

  // Escape backticks in code for YAML multiline
  const code = d.code || '// no code'
  const solution = '```' + lang + '\n' + code + '\n```'

  const runtime = d.runtimeDisplay || '-'
  const memory = d.memoryDisplay || '-'
  const beatsRuntime = d.runtimePercentile != null ? Number(d.runtimePercentile).toFixed(2) : '0'
  const beatsMemory = d.memoryPercentile != null ? Number(d.memoryPercentile).toFixed(2) : '0'

  // Build frontmatter manually to control multiline format
  const lines = [
    '---',
    `title: "${q.title}"`,
    `difficulty: ${difficulty}`,
    `tags: []`,
    `lang: ${lang}`,
    `runtime: "${runtime}"`,
    `memory: "${memory}"`,
    `beats_runtime: ${beatsRuntime}`,
    `beats_memory: ${beatsMemory}`,
    `problem: |`,
    ...problem.split('\n').map(l => `  ${l}`),
    `solution: |`,
    ...solution.split('\n').map(l => `  ${l}`),
    '---',
    '',
  ]
  return lines.join('\n')
}

const syncSolutions = async (recentSubmissions) => {
  if (!sessionCookie) {
    console.log('Skipping solution sync: LEETCODE_SESSION not set.')
    return
  }

  mkdirSync(solutionsDir, { recursive: true })

  // Deduplicate by titleSlug, keep first (most recent) submission
  const seen = new Set()
  const accepted = recentSubmissions.filter(s => {
    if (seen.has(s.titleSlug)) return false
    seen.add(s.titleSlug)
    return true
  })

  console.log(`Syncing ${accepted.length} solution(s)...`)

  for (const sub of accepted) {
    try {
      const payload = await fetchGraphQL(
        submissionDetailsQuery,
        { submissionId: Number(sub.submissionId) },
        true
      )

      if (!payload.data?.submissionDetails) {
        console.warn(`  ⚠ No details for ${sub.titleSlug} (submissionId: ${sub.submissionId})`)
        continue
      }

      const filePath = resolve(solutionsDir, `${sub.titleSlug}.md`)
      const existing = existsSync(filePath) ? readExistingFrontmatter(filePath) : null
      const md = buildSolutionMd(payload.data, existing?.problem)
      writeFileSync(filePath, md)
      console.log(`  ✓ ${sub.titleSlug}`)

      // Rate limit: avoid hitting LeetCode too fast
      await new Promise(r => setTimeout(r, 500))
    } catch (err) {
      console.warn(`  ✗ ${sub.titleSlug}: ${err.message}`)
    }
  }
}

// ─── Main ───

const main = async () => {
  const previousProfile = readPreviousProfile()

  try {
    const payload = await fetchGraphQL(profileQuery, { username })
    const normalizedProfile = normalizeProfile(payload, previousProfile)
    writeFileSync(outputPath, `${JSON.stringify(normalizedProfile, null, 2)}\n`)
    console.log(`Updated LeetCode profile for ${normalizedProfile.username}.`)

    // Sync solutions if session cookie is available
    await syncSolutions(normalizedProfile.recent)
  } catch (error) {
    const staleProfile = markStale(previousProfile)
    writeFileSync(outputPath, `${JSON.stringify(staleProfile, null, 2)}\n`)
    console.warn(error instanceof Error ? error.message : 'Unknown LeetCode sync error.')
    console.warn('Using previous LeetCode snapshot with isStale=true.')
  }
}

await main()
