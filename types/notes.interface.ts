export interface INote {
  id: string
  url: string
  title: string
  summary: string
  tags: string[]
  publishedAt: string
  updatedAt?: string | null
  featured: boolean
  displayOrder: number
  isVisible: boolean
}
