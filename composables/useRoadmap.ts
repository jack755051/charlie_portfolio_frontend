import type {
  IRoadmapItem,
  RoadmapCategory,
  RoadmapHorizon,
  RoadmapStatus,
} from '~/types/roadmap.interface'
import roadmapData from '~/assets/data/roadmap.json'

type RoadmapSource = (typeof roadmapData.items)[number]

const normalizeItem = (item: RoadmapSource): IRoadmapItem => ({
  id: item.id,
  horizon: item.horizon as RoadmapHorizon,
  category: item.category as RoadmapCategory,
  i18nNamespace: 'roadmap.items',
  tags: item.tags,
  status: item.status as RoadmapStatus,
  displayOrder: item.displayOrder,
  isVisible: item.isVisible,
})

export const useRoadmap = () => {
  const visibleItems = computed<IRoadmapItem[]>(() =>
    roadmapData.items
      .filter(item => item.isVisible)
      .sort((a, b) => a.displayOrder - b.displayOrder)
      .map(normalizeItem)
  )

  const itemsByHorizon = computed(() => ({
    short: visibleItems.value.filter(item => item.horizon === 'short'),
    mid: visibleItems.value.filter(item => item.horizon === 'mid'),
    long: visibleItems.value.filter(item => item.horizon === 'long'),
  }))

  return { visibleItems, itemsByHorizon }
}
