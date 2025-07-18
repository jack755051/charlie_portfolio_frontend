/**
 * 導航相關的工具函數
 */

/**
 * 開啟外部連結
 * @param url - 要開啟的 URL
 */
export const openExternalLink = (url: string): void => {
  try {
    window.open(url, '_blank', 'noopener,noreferrer')
  } catch (error) {
    console.error('Failed to open external link:', error)
    // 備用方案：使用 location.href
    window.location.href = url
  }
}

/**
 * 平滑滾動到指定元素
 * @param element - 要滾動到的元素
 */
export const scrollToElement = (element: HTMLElement | null): void => {
  if (element) {
    element.scrollIntoView({ behavior: 'smooth' })
  }
}

/**
 * 平滑滾動到指定 ID 的元素
 * @param elementId - 元素的 ID
 */
export const scrollToElementById = (elementId: string): void => {
  const element = document.getElementById(elementId)
  scrollToElement(element)
}
