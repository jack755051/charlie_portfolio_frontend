import type { IAnchor } from '~/types/anchor.interface'
import { useSiteReference } from '~/composables/useSiteReference'

export const useAnchor = () => {
  const { getPageAnchors } = useSiteReference()

  /**首頁頁面錨點*/
  const anchorHomePage = ref<IAnchor[]>(getPageAnchors('home'))
  /**關於頁面錨點*/
  const anchorAboutPage = ref<IAnchor[]>(getPageAnchors('about'))
  /**作品集頁面錨點*/
  const anchorPortfolioPage = ref<IAnchor[]>(getPageAnchors('portfolio'))

  return {
    anchorHomePage,
    anchorAboutPage,
    anchorPortfolioPage,
  }
}
