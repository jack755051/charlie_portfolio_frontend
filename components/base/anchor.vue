<template>
  <nav
    ref="anchorNav"
    class="custom-anchor-nav hidden md:flex flex-col gap-1 md:bg-transparent md:shadow-none md:border-0 md:p-0 xl:p-4 xl:bg-white/80 xl:dark:bg-slate-900/70 xl:backdrop-blur xl:border xl:border-slate-200/80 xl:dark:border-white/10 xl:shadow-lg xl:rounded-2xl"
    :class="{ 'is-compact': isCompact, 'is-scrolling': isScrolling }"
    aria-label="Section anchors"
    @mouseenter="isPointerActive = true"
    @mouseleave="isPointerActive = false"
    @focusin="isPointerActive = true"
    @focusout="isPointerActive = false"
  >
    <ul class="anchor-list">
      <li
        v-for="item in anchorData"
        :key="item.key"
        v-motion="motion.railItem"
        class="anchor-item group"
        :class="{ active: activeAnchor === item.key }"
        :data-tooltip="item.title"
        @click="scrollToSection(item.key, item.href)"
      >
        <span class="anchor-dot" />
        <span class="anchor-title hidden xl:inline">{{ item.title }}</span>
      </li>
    </ul>
  </nav>
</template>

<script setup lang="ts">
import { computed, ref, onMounted, onUnmounted, watch } from 'vue'
import { useReducedMotion, useSpring } from '@vueuse/motion'
import type { IAnchor } from '~/types/anchor.interface'

interface Props {
  anchorData?: IAnchor[]
  affix?: boolean
}

const props = defineProps<Props>()
const activeAnchor = ref<string>('')
const isIdle = ref(false)
const isScrolling = ref(false)
const isPointerActive = ref(false)
const anchorNav = ref<HTMLElement | null>(null)
let idleTimer: ReturnType<typeof setTimeout> | null = null
let scrollTarget: HTMLElement | Window | null = null

const IDLE_DELAY_MS = 1200
const motion = useMotionPresets()
const reducedMotion = useReducedMotion()
const isCompact = computed(() => isIdle.value && !isScrolling.value && !isPointerActive.value)
const anchorSpring = useSpring(
  {
    opacity: 1,
    x: 0,
    scale: 1,
  },
  {
    target: anchorNav,
    stiffness: 320,
    damping: 32,
    mass: 0.7,
  }
)

const syncAnchorMotion = () => {
  if (reducedMotion.value) {
    anchorSpring.set({ opacity: 1, x: 0, scale: 1 })
    return
  }
  anchorSpring.set({
    opacity: isCompact.value ? 0.52 : 1,
    x: isCompact.value ? 6 : 0,
    scale: isCompact.value ? 0.985 : 1,
  })
}

const getScrollTarget = () => {
  return document.querySelector<HTMLElement>('.snap-y') || window
}

const markScrolling = () => {
  isIdle.value = false
  isScrolling.value = true
  if (idleTimer) clearTimeout(idleTimer)
  idleTimer = setTimeout(() => {
    isScrolling.value = false
    isIdle.value = true
  }, IDLE_DELAY_MS)
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
  markScrolling()
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
  syncAnchorMotion()
  idleTimer = setTimeout(() => {
    isIdle.value = true
  }, IDLE_DELAY_MS)
})

watch([isCompact, reducedMotion], syncAnchorMotion)

onUnmounted(() => {
  if (scrollTarget) {
    scrollTarget.removeEventListener('scroll', throttledHandleScroll)
  }
  if (scrollTimer) {
    cancelAnimationFrame(scrollTimer)
  }
  if (idleTimer) {
    clearTimeout(idleTimer)
  }
})
</script>

<style scoped>
.custom-anchor-nav {
  transform-origin: center right;
  will-change: opacity, transform;
  transition:
    background-color 220ms ease,
    border-color 220ms ease,
    box-shadow 220ms ease;
}

.anchor-list {
  list-style: none;
  padding: 0;
  margin: 0;
  display: flex;
  flex-direction: column;
  gap: 10px;
  transition:
    gap 240ms cubic-bezier(0.16, 1, 0.3, 1),
    align-items 240ms ease;
}

.custom-anchor-nav.is-compact .anchor-list {
  align-items: center;
  gap: 18px;
}

/* 預設（md ~ xl）：dot-only，tooltip 顯示標題 */
.anchor-item {
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 28px;
  height: 28px;
  max-width: 28px;
  border-radius: 9999px;
  cursor: pointer;
  transition:
    background-color 0.22s ease,
    opacity 0.22s ease,
    transform 0.22s cubic-bezier(0.16, 1, 0.3, 1),
    width 0.22s cubic-bezier(0.16, 1, 0.3, 1),
    max-width 0.22s cubic-bezier(0.16, 1, 0.3, 1),
    height 0.22s cubic-bezier(0.16, 1, 0.3, 1),
    padding 0.22s cubic-bezier(0.16, 1, 0.3, 1),
    gap 0.22s cubic-bezier(0.16, 1, 0.3, 1);
}

.anchor-item:hover {
  background: rgb(var(--primary) / 0.08);
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

.custom-anchor-nav.is-compact .anchor-dot {
  background: rgb(var(--muted-foreground) / 0.5);
}

.custom-anchor-nav.is-compact .anchor-item.active .anchor-dot {
  background: rgb(var(--primary) / 0.82);
  box-shadow: 0 0 8px rgb(var(--primary) / 0.35);
}

.anchor-item.active .anchor-dot {
  background: rgb(var(--primary));
  transform: scale(1.4);
  box-shadow: 0 0 10px rgb(var(--primary) / 0.6);
}

/* Tooltip（僅在 dot-only 模式 md ~ xl）*/
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

.anchor-item:hover::after {
  opacity: 1;
  transform: translateY(-50%) translateX(0);
}

/* XL 以上：展開 title，關掉 tooltip */
@media (min-width: 1280px) {
  .anchor-item {
    width: auto;
    height: auto;
    max-width: 220px;
    justify-content: flex-start;
    padding: 8px 12px;
    border-radius: 8px;
    gap: 12px;
  }
  .anchor-item::after {
    display: none;
  }
  .anchor-item.active {
    background: rgb(var(--primary) / 0.12);
  }
  .anchor-title {
    font-size: 14px;
    color: rgb(var(--muted-foreground));
    max-width: 180px;
    opacity: 1;
    overflow: hidden;
    transition:
      color 0.2s ease,
      max-width 220ms cubic-bezier(0.16, 1, 0.3, 1),
      opacity 140ms ease;
    white-space: nowrap;
  }
  .anchor-item.active .anchor-title {
    color: rgb(var(--primary));
    font-weight: 600;
  }
  .custom-anchor-nav.is-compact .anchor-title {
    max-width: 0;
    opacity: 0;
    transition:
      color 0.2s ease,
      max-width 320ms cubic-bezier(0.4, 0, 0.2, 1),
      opacity 180ms ease;
  }
  .custom-anchor-nav.is-compact .anchor-item {
    width: 28px;
    max-width: 28px;
    height: 28px;
    justify-content: center;
    gap: 0;
    padding: 0;
    transition-duration: 340ms;
  }
  .custom-anchor-nav:not(.is-compact) .anchor-item {
    transition-duration: 190ms;
  }
  .custom-anchor-nav:not(.is-compact) .anchor-title {
    transition:
      color 0.2s ease,
      max-width 190ms cubic-bezier(0.16, 1, 0.3, 1),
      opacity 120ms ease 40ms;
  }
}

@media (prefers-reduced-motion: reduce) {
  .custom-anchor-nav,
  .anchor-dot,
  .anchor-title,
  .anchor-item {
    transition: none !important;
  }
  .custom-anchor-nav.is-compact {
    opacity: 1;
    transform: none;
  }
  .custom-anchor-nav.is-compact .anchor-title {
    max-width: none;
    opacity: 1;
  }
}
</style>
