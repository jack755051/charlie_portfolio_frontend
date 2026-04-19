<template>
  <nav
    class="custom-anchor-nav hidden md:flex flex-col gap-1 md:bg-transparent md:shadow-none md:border-0 md:p-0 xl:p-4 xl:bg-white/80 xl:dark:bg-slate-900/70 xl:backdrop-blur xl:border xl:border-slate-200/80 xl:dark:border-white/10 xl:shadow-lg xl:rounded-2xl"
    aria-label="Section anchors"
  >
    <ul class="anchor-list">
      <li
        v-for="item in anchorData"
        :key="item.key"
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
import { ref, onMounted, onUnmounted } from 'vue'
import type { IAnchor } from '~/types/anchor.interface'

interface Props {
  anchorData?: IAnchor[]
  affix?: boolean
}

const props = defineProps<Props>()
const activeAnchor = ref<string>('')

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

  const scrollContainer = document.querySelector('.snap-y')
  if (!scrollContainer) return

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
  const scrollContainer = document.querySelector('.snap-y')
  if (scrollContainer) {
    scrollContainer.addEventListener('scroll', throttledHandleScroll, { passive: true })
    handleScroll()
  }
})

onUnmounted(() => {
  const scrollContainer = document.querySelector('.snap-y')
  if (scrollContainer) {
    scrollContainer.removeEventListener('scroll', throttledHandleScroll)
  }
  if (scrollTimer) {
    cancelAnimationFrame(scrollTimer)
  }
})
</script>

<style scoped>
.anchor-list {
  list-style: none;
  padding: 0;
  margin: 0;
  display: flex;
  flex-direction: column;
  gap: 10px;
}

/* 預設（md ~ xl）：dot-only，tooltip 顯示標題 */
.anchor-item {
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 28px;
  height: 28px;
  border-radius: 9999px;
  cursor: pointer;
  transition: all 0.2s ease;
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
    transition: color 0.2s ease;
    white-space: nowrap;
  }
  .anchor-item.active .anchor-title {
    color: rgb(var(--primary));
    font-weight: 600;
  }
}

@media (prefers-reduced-motion: reduce) {
  .anchor-dot,
  .anchor-item {
    transition: none !important;
  }
}
</style>
