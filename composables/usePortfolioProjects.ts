import type { IPortfolioMetadata } from '~/types/portfolio.interface'
import portfolioProjects from '~/assets/data/portfolio-projects.json'
import { useGithubProjects } from '~/composables/useGithubProjects'
import { normalizeProjectId } from '~/utils/project-id'

type PortfolioProjectRecord = (typeof portfolioProjects.projects)[number]

const normalizeManualProject = (project: PortfolioProjectRecord): IPortfolioMetadata => ({
  id: project.id,
  projectType: project.projectType as IPortfolioMetadata['projectType'],
  i18nNamespace: project.i18nNamespace as IPortfolioMetadata['i18nNamespace'],
  link: project.link ?? null,
  technologies: (
    project.technologies as Array<{
      name: string
      icon: string
      category?: string | null
    }>
  ).map(technology => ({
    name: technology.name,
    icon: technology.icon,
    category: technology.category ?? null,
  })),
  screenshots: (
    project.screenshots as Array<{
      url: string
      caption?: string | null
    }>
  ).map(screenshot => ({
    url: screenshot.url,
    caption: screenshot.caption ?? null,
  })),
  displayOrder: project.displayOrder,
  isPublished: project.isPublished,
  source: 'manual',
})

export const usePortfolioProjects = () => {
  const { githubProjects } = useGithubProjects()

  // 合併：manual 優先；同 id 時 github 靜默跳過避免覆蓋手寫內容
  const publishedProjects = computed<IPortfolioMetadata[]>(() => {
    const manualList = portfolioProjects.projects
      .filter(project => project.isPublished)
      .sort((a, b) => a.displayOrder - b.displayOrder)
      .map(normalizeManualProject)

    const manualIds = new Set(manualList.map(project => normalizeProjectId(project.id)))
    const githubList = githubProjects.value.filter(
      project => !manualIds.has(normalizeProjectId(project.id))
    )

    return [...manualList, ...githubList]
  })

  const companyProjects = computed(() =>
    publishedProjects.value.filter(project => project.projectType === 'company')
  )

  // 個人專案：manual personal + GitHub personal，pinned (displayOrder=-1) 優先
  const personalProjects = computed(() =>
    publishedProjects.value
      .filter(project => project.projectType === 'personal')
      .sort((a, b) => a.displayOrder - b.displayOrder)
  )

  const findProjectById = (id: string) => {
    const normalizedId = normalizeProjectId(id)
    return publishedProjects.value.find(project => normalizeProjectId(project.id) === normalizedId)
  }

  return {
    publishedProjects,
    companyProjects,
    personalProjects,
    findProjectById,
  }
}
