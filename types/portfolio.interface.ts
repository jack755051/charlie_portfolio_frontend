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
  link?: string
  screenshots?: { url: string; caption?: string }[]
  technologies: { name: string; icon: string }[] // 技術名稱通常保留英文，不需翻譯
}
