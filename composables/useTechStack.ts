import siteReference from '~/assets/data/site-reference.json'

// 定義介面
export interface ITechItem {
  name: string
  iconName: string
  color?: string
}

export interface ITechCategory {
  titleKey: string // 改為返回 i18n key
  descriptionKey: string // 改為返回 i18n key
  items: ITechItem[]
  class?: string
}

export const useTechStack = () => {
  const techStack = ref<ITechCategory[]>(
    siteReference.technologyCatalogs.map(category => ({
      titleKey: category.titleKey,
      descriptionKey: category.descriptionKey,
      class: category.class,
      items: category.items.map(item => ({
        name: item.name,
        iconName: item.iconName,
        color: item.color ?? undefined,
      })),
    }))
  )

  return { techStack }
}
