export interface IPortfolio {
  id: string
  title: string
  description: string
  role: string
  duration: string
  technologies: ITechnologyItem[]
  features?: string[]
  achievements?: string[]
  link?: string
  screenshots?: Array<{
    url: string
    caption?: string
  }>
}

export interface ITechnologyItem {
  name: string
  icon: string
  category?: string
}

export interface IPortfolioMetadata {
  id: string
  projectType: 'company' | 'personal'
  i18nNamespace: 'portfolio.projects'
  link?: string | null
  screenshots?: { url: string; caption?: string | null }[]
  technologies: { name: string; icon: string; category?: string | null }[] // 技術名稱通常保留英文，不需翻譯
  displayOrder: number
  isPublished: boolean
}
