import type { IGithubProjectDetailEntry } from '~/types/portfolio.interface'
import githubProjectDetailsData from '~/assets/data/github-project-details.json'
import { normalizeProjectId } from '~/utils/project-id'

type GithubProjectDetailsSnapshot = {
  entries: Record<
    string,
    {
      summary_zh: string
      summary_en: string
      features_zh: string[]
      features_en: string[]
      achievements_zh: string[]
      achievements_en: string[]
      screenshots: { url: string; caption?: string | null }[]
    }
  >
}

const normalizeEntry = (
  entry: GithubProjectDetailsSnapshot['entries'][string] | undefined
): IGithubProjectDetailEntry | null => {
  if (!entry) return null

  return {
    summaryZh: entry.summary_zh,
    summaryEn: entry.summary_en,
    featuresZh: entry.features_zh,
    featuresEn: entry.features_en,
    achievementsZh: entry.achievements_zh,
    achievementsEn: entry.achievements_en,
    screenshots: entry.screenshots.map(screenshot => ({
      url: screenshot.url,
      caption: screenshot.caption ?? null,
    })),
  }
}

export const useGithubProjectDetails = () => {
  const snapshot = githubProjectDetailsData as unknown as GithubProjectDetailsSnapshot

  const entries = snapshot.entries || {}

  const findDetailById = (id: string) => {
    const directEntry = entries[id]
    if (directEntry) return normalizeEntry(directEntry)

    const normalizedId = normalizeProjectId(id)
    const matchedEntry = Object.entries(entries).find(
      ([entryId]) => normalizeProjectId(entryId) === normalizedId
    )?.[1]

    return normalizeEntry(matchedEntry)
  }

  return {
    findDetailById,
  }
}
