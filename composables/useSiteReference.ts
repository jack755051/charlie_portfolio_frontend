import type { IAnchor } from '~/types/anchor.interface'
import type { RouterLink } from '~/types/foundation.interface'
import siteReference from '~/assets/data/site-reference.json'

type PageCode = 'home' | 'about' | 'portfolio'

export const useSiteReference = () => {
  const navigationMenus = computed<RouterLink[]>(() =>
    siteReference.navigationMenus
      .filter(item => item.isVisible)
      .sort((a, b) => a.displayOrder - b.displayOrder)
      .map(item => ({
        router: item.routePath,
        label: item.label,
      }))
  )

  const getPageAnchors = (pageCode: PageCode): IAnchor[] =>
    siteReference.pageAnchors
      .filter(anchor => anchor.pageCode === pageCode)
      .sort((a, b) => a.displayOrder - b.displayOrder)
      .map(anchor => ({
        key: anchor.key,
        href: anchor.href,
        title: anchor.title,
      }))

  const iconRegistry = computed(() => siteReference.iconRegistry)

  return {
    navigationMenus,
    getPageAnchors,
    iconRegistry,
  }
}
