import type { IPortfolioMetadata } from '~/types/portfolio.interface'
import portfolioProjects from '~/assets/data/portfolio-projects.json'

type PortfolioProjectRecord = (typeof portfolioProjects.projects)[number]

const normalizeProject = (project: PortfolioProjectRecord): IPortfolioMetadata => ({
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
})

export const usePortfolioProjects = () => {
  const publishedProjects = computed<IPortfolioMetadata[]>(() =>
    portfolioProjects.projects
      .filter(project => project.isPublished)
      .sort((a, b) => a.displayOrder - b.displayOrder)
      .map(normalizeProject)
  )

  const companyProjects = computed(() =>
    publishedProjects.value.filter(project => project.projectType === 'company')
  )

  const personalProjects = computed(() =>
    publishedProjects.value.filter(project => project.projectType === 'personal')
  )

  const findProjectById = (id: string) => publishedProjects.value.find(project => project.id === id)

  return {
    publishedProjects,
    companyProjects,
    personalProjects,
    findProjectById,
  }
}
