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
  // GitHub 來源附加欄位（manual 為 undefined）
  source?: 'manual' | 'github'
  status?: 'wip' | 'done' | 'archived'
  repoUrl?: string
  stars?: number
  titleOverride?: string | null
  titleZhOverride?: string | null
  descriptionOverride?: string | null
  descriptionZhOverride?: string | null
  roleOverride?: string | null
  durationOverride?: string | null
}

export interface IGithubProjectSnapshot {
  id: string
  title: string
  titleZh?: string | null
  description: string
  descriptionZh?: string | null
  role?: string | null
  duration: string
  technologies: { name: string; icon?: string | null; category?: string | null }[]
  tags?: string[]
  status: 'wip' | 'done' | 'archived'
  type: 'personal'
  homepage?: string | null
  repoUrl: string
  stars: number
  lastUpdatedAt: string
  pinned: boolean
  isVisible: boolean
  screenshots?: { url: string; caption?: string | null }[]
}

export interface IGithubProjectDetailEntry {
  summaryZh: string
  summaryEn: string
  featuresZh: string[]
  featuresEn: string[]
  achievementsZh: string[]
  achievementsEn: string[]
  screenshots: { url: string; caption?: string | null }[]
}
