<template>
  <nav
    class="custom-anchor-nav hidden md:flex flex-col items-center bg-white/75 dark:bg-slate-900/70 backdrop-blur border border-slate-200/80 dark:border-white/10 shadow-lg rounded-2xl"
    :class="{ 'is-expanded': isExpanded }"
    aria-label="Section anchors"
    @mouseenter="openAnchor"
    @mouseleave="scheduleClose"
    @focusin="openAnchor"
    @focusout="scheduleClose"
  >
    <ul class="anchor-list">
      <li
        v-for="item in anchorData"
        :key="item.key"
        class="anchor-item group"
        :class="{ active: activeAnchor === item.key }"
        :data-tooltip="item.title"
        tabindex="0"
        @click="scrollToSection(item.key, item.href)"
        @keydown.enter.prevent="scrollToSection(item.key, item.href)"
        @keydown.space.prevent="scrollToSection(item.key, item.href)"
      >
        <span class="anchor-dot" />
        <span class="anchor-title">{{ item.title }}</span>
      </li>
    </ul>
  </nav>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'
import type { IAnchor } from '~/types/anchor.interface'

interface Props {
  anchorData?: IAnchor[]
  affix?: boolean
}

const props = defineProps<Props>()
const activeAnchor = ref<string>('')
const isExpanded = ref(false)
let scrollTarget: HTMLElement | Window | null = null
let closeTimer: ReturnType<typeof setTimeout> | null = null

const COLLAPSE_DELAY_MS = 300

const openAnchor = () => {
  if (closeTimer) {
    clearTimeout(closeTimer)
    closeTimer = null
  }
  isExpanded.value = true
}

const scheduleClose = () => {
  if (closeTimer) {
    clearTimeout(closeTimer)
  }
  closeTimer = setTimeout(() => {
    isExpanded.value = false
    closeTimer = null
  }, COLLAPSE_DELAY_MS)
}

const getScrollTarget = () => {
  return document.querySelector<HTMLElement>('.snap-y') || window
}

const scrollToSection = (sectionKey: string, href: string) => {
  const sectionId = href.replace('#', '')
  const targetElement = document.getElementById(sectionId)

  if (targetElement) {
    targetElement.scrollIntoView({ behavior: 'smooth', block: 'start' })
    activeAnchor.value = sectionKey
  }
}

const handleScroll = () => {
  if (!props.anchorData) return

  const sections = props.anchorData
    .map(item => ({
      key: item.key,
      element: document.getElementById(item.href.replace('#', '')),
    }))
    .filter(item => item.element)

  let currentSection = sections[0]?.key || ''
  for (const section of sections) {
    if (section.element) {
      const rect = section.element.getBoundingClientRect()
      if (rect.top <= window.innerHeight / 2 && rect.bottom > 0) {
        currentSection = section.key
      }
    }
  }
  activeAnchor.value = currentSection
}

let scrollTimer: number | null = null
const throttledHandleScroll = () => {
  if (scrollTimer) return
  scrollTimer = requestAnimationFrame(() => {
    handleScroll()
    scrollTimer = null
  })
}

onMounted(() => {
  scrollTarget = getScrollTarget()
  scrollTarget.addEventListener('scroll', throttledHandleScroll, { passive: true })
  handleScroll()
})

onUnmounted(() => {
  if (scrollTarget) {
    scrollTarget.removeEventListener('scroll', throttledHandleScroll)
  }
  if (scrollTimer) {
    cancelAnimationFrame(scrollTimer)
  }
  if (closeTimer) {
    clearTimeout(closeTimer)
  }
})
</script>

<style scoped>
.custom-anchor-nav {
  width: 44px;
  padding: 12px 8px;
  overflow: visible;
  transition:
    width 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94),
    padding 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94),
    opacity 0.2s ease;
  opacity: 0.75;
}

.custom-anchor-nav.is-expanded {
  width: 168px;
  padding: 12px;
  opacity: 1;
}

.anchor-list {
  list-style: none;
  padding: 0;
  margin: 0;
  display: flex;
  align-items: center;
  flex-direction: column;
  gap: 18px;
  width: 100%;
  transition: gap 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94);
}

.custom-anchor-nav.is-expanded .anchor-list {
  align-items: stretch;
  gap: 6px;
}

.anchor-item {
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 26px;
  height: 26px;
  box-sizing: border-box;
  border-radius: 9999px;
  cursor: pointer;
  outline: none;
  overflow: visible;
  transition:
    background-color 0.2s ease,
    border-radius 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94),
    gap 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94),
    height 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94),
    padding 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94),
    width 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94);
}

.custom-anchor-nav.is-expanded .anchor-item {
  width: 100%;
  height: 34px;
  justify-content: flex-start;
  gap: 10px;
  padding: 0 10px;
  border-radius: 8px;
}

.anchor-item:hover {
  background: rgb(var(--primary) / 0.08);
}

.anchor-item:focus-visible {
  background: rgb(var(--primary) / 0.1);
  box-shadow: 0 0 0 2px rgb(var(--primary) / 0.22);
}

.anchor-dot {
  display: block;
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background: rgb(var(--muted-foreground) / 0.6);
  transition: all 0.25s ease;
  flex-shrink: 0;
}

.anchor-item.active .anchor-dot {
  background: rgb(var(--primary));
  transform: scale(1.4);
  box-shadow: 0 0 10px rgb(var(--primary) / 0.6);
}

.custom-anchor-nav.is-expanded .anchor-item.active {
  background: rgb(var(--primary) / 0.12);
}

.anchor-title {
  max-width: 0;
  overflow: hidden;
  color: rgb(var(--muted-foreground));
  font-size: 13px;
  font-weight: 600;
  line-height: 1;
  opacity: 0;
  pointer-events: none;
  text-overflow: ellipsis;
  transition:
    color 0.2s ease,
    max-width 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94),
    opacity 0.25s ease;
  white-space: nowrap;
}

.custom-anchor-nav.is-expanded .anchor-title {
  max-width: 112px;
  opacity: 1;
  pointer-events: auto;
}

.anchor-item.active .anchor-title {
  color: rgb(var(--primary));
}

/* Tooltip: 只在收合狀態 hover 時顯示 */
.anchor-item::after {
  content: attr(data-tooltip);
  position: absolute;
  left: calc(100% + 10px);
  top: 50%;
  transform: translateY(-50%) translateX(-6px);
  background: rgb(var(--foreground) / 0.92);
  color: rgb(var(--background));
  font-size: 12px;
  line-height: 1;
  padding: 6px 10px;
  border-radius: 6px;
  white-space: nowrap;
  opacity: 0;
  pointer-events: none;
  transition:
    opacity 0.18s ease,
    transform 0.18s ease;
  z-index: 10;
}

.anchor-item:hover::after,
.anchor-item:focus-visible::after {
  opacity: 1;
  transform: translateY(-50%) translateX(0);
}

.custom-anchor-nav.is-expanded .anchor-item::after {
  display: none;
}

@media (prefers-reduced-motion: reduce) {
  .custom-anchor-nav,
  .anchor-dot,
  .anchor-title,
  .anchor-item {
    transition: none !important;
  }
}
</style>
