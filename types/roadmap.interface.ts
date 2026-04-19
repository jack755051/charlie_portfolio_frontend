export type RoadmapHorizon = 'short' | 'mid' | 'long'
export type RoadmapCategory = 'frontend' | 'backend' | 'infra' | 'ai' | 'career'
export type RoadmapStatus = 'planning' | 'in-progress' | 'completed'

export interface IRoadmapItem {
  id: string
  horizon: RoadmapHorizon
  category: RoadmapCategory
  i18nNamespace: 'roadmap.items'
  tags: string[]
  status: RoadmapStatus
  displayOrder: number
  isVisible: boolean
}
