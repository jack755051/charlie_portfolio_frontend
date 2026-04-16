import { readFileSync, writeFileSync } from 'node:fs'
import { resolve } from 'node:path'

const root = process.cwd()
const outputPath = resolve(root, 'assets/data/leetcode-profile.json')
const username = process.env.LEETCODE_USERNAME || 'jack755051'
const endpoint = 'https://leetcode.com/graphql'

const query = `
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
  recentSubmissionList(username: $username, limit: 10) {
    title
    titleSlug
    timestamp
    statusDisplay
    lang
  }
}
`

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
    .map(item => ({
      name: item.tagName,
      value: Number(item.problemsSolved),
    }))
}

const normalizeProfile = (payload, previousProfile) => {
  const data = payload?.data
  const matchedUser = data?.matchedUser

  if (!matchedUser) {
    throw new Error(`LeetCode user not found: ${username}`)
  }

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
    easy,
    medium,
    hard,
    easyPct: totalEasy > 0 ? clampPct((easy / totalEasy) * 100) : 0,
    mediumPct: totalMedium > 0 ? clampPct((medium / totalMedium) * 100) : 0,
    hardPct: totalHard > 0 ? clampPct((hard / totalHard) * 100) : 0,
    calendar: normalizeCalendar(matchedUser.submissionCalendar),
    recent: (data.recentSubmissionList || []).slice(0, 5).map(item => ({
      title: item.title,
      titleSlug: item.titleSlug,
      time: formatShortDate(item.timestamp),
      status: item.statusDisplay,
      lang: item.lang,
      isSuccess: item.statusDisplay === 'Accepted',
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

  return {
    ...previousProfile,
    source: 'stale-cache',
    expiresAt: expiresAt.toISOString(),
    isStale: true,
  }
}

const fetchLeetCodeProfile = async () => {
  const response = await fetch(endpoint, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'User-Agent':
        'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
      Referer: 'https://leetcode.com/',
      Origin: 'https://leetcode.com',
    },
    body: JSON.stringify({
      query,
      variables: { username },
    }),
  })

  if (!response.ok) {
    throw new Error(`LeetCode GraphQL request failed: ${response.status} ${response.statusText}`)
  }

  const payload = await response.json()

  if (payload.errors?.length) {
    throw new Error(`LeetCode GraphQL returned ${payload.errors.length} error(s).`)
  }

  return payload
}

const main = async () => {
  const previousProfile = readPreviousProfile()

  try {
    const payload = await fetchLeetCodeProfile()
    const normalizedProfile = normalizeProfile(payload, previousProfile)
    writeFileSync(outputPath, `${JSON.stringify(normalizedProfile, null, 2)}\n`)
    console.log(`Updated LeetCode profile for ${normalizedProfile.username}.`)
  } catch (error) {
    const staleProfile = markStale(previousProfile)
    writeFileSync(outputPath, `${JSON.stringify(staleProfile, null, 2)}\n`)
    console.warn(error instanceof Error ? error.message : 'Unknown LeetCode sync error.')
    console.warn('Using previous LeetCode snapshot with isStale=true.')
  }
}

await main()
