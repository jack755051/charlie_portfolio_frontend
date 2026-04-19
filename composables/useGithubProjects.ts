import type { IGithubProjectSnapshot, IPortfolioMetadata } from '~/types/portfolio.interface'
import githubProjectsData from '~/assets/data/github-projects.json'

// 把 GitHub snapshot 轉為 Portfolio metadata 相容格式，供列表 + 詳情頁共用
const adaptToPortfolioMetadata = (project: IGithubProjectSnapshot): IPortfolioMetadata => ({
  id: project.id,
  projectType: 'personal',
  i18nNamespace: 'portfolio.projects',
  link: project.homepage ?? project.repoUrl,
  screenshots: (project.screenshots || []).map(s => ({
    url: s.url,
    caption: s.caption ?? null,
  })),
  technologies: project.technologies.map(tech => ({
    name: tech.name,
    icon: tech.icon || 'CodeIcon',
    category: tech.category ?? null,
  })),
  displayOrder: project.pinned ? -1 : 9999,
  isPublished: project.isVisible,
  source: 'github',
  status: project.status,
  repoUrl: project.repoUrl,
  stars: project.stars,
  titleOverride: project.title,
  titleZhOverride: project.titleZh ?? null,
  descriptionOverride: project.description,
  descriptionZhOverride: project.descriptionZh ?? null,
  roleOverride: project.role ?? null,
  durationOverride: project.duration,
})

export const useGithubProjects = () => {
  const snapshot = githubProjectsData as unknown as {
    projects: IGithubProjectSnapshot[]
    isStale: boolean
    sourceFetchedAt: string
  }

  const githubProjects = computed<IPortfolioMetadata[]>(() =>
    (snapshot.projects || [])
      .filter(project => project.isVisible)
      .sort((a, b) => {
        if (a.pinned !== b.pinned) return a.pinned ? -1 : 1
        return (b.lastUpdatedAt || '').localeCompare(a.lastUpdatedAt || '')
      })
      .map(adaptToPortfolioMetadata)
  )

  return {
    githubProjects,
    isStale: computed(() => snapshot.isStale === true),
    lastSyncedAt: computed(() => snapshot.sourceFetchedAt),
  }
}
