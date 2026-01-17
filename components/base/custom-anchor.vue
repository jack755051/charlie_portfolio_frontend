<template>
  <div class="custom-anchor">
    <ul class="anchor-list">
      <li
        v-for="item in anchorData"
        :key="item.key"
        class="anchor-item"
        :class="{ active: activeAnchor === item.key }"
        @click="scrollToSection(item.key)"
      >
        <span class="anchor-dot"></span>
        <span class="anchor-title">{{ item.title }}</span>
      </li>
    </ul>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'
import type { IAnchor } from '~/types/anchor.interface'

interface Props {
  anchorData?: IAnchor[]
}

const props = defineProps<Props>()
const activeAnchor = ref<string>('')

// 滾動到指定區塊
const scrollToSection = (sectionId: string) => {
  const targetElement = document.getElementById(sectionId)
  if (targetElement) {
    // 使用 scrollIntoView 來平滑滾動
    targetElement.scrollIntoView({
      behavior: 'smooth',
      block: 'start',
    })
    activeAnchor.value = sectionId
  }
}

// 監聽滾動事件來更新當前活躍的錨點
const handleScroll = () => {
  if (!props.anchorData) return

  const scrollContainer = document.querySelector('.snap-y.snap-mandatory')
  if (!scrollContainer) return

  const scrollTop = scrollContainer.scrollTop
  const sections = props.anchorData
    .map(item => ({
      id: item.key,
      element: document.getElementById(item.key),
    }))
    .filter(item => item.element)

  // 找到當前視窗中的區塊
  let currentSection = sections[0]?.id || ''

  for (const section of sections) {
    if (section.element) {
      const rect = section.element.getBoundingClientRect()
      // 如果區塊的頂部在視窗上半部分，則認為是當前區塊
      if (rect.top <= window.innerHeight / 2) {
        currentSection = section.id
      }
    }
  }

  activeAnchor.value = currentSection
}

onMounted(() => {
  const scrollContainer = document.querySelector('.snap-y.snap-mandatory')
  if (scrollContainer) {
    scrollContainer.addEventListener('scroll', handleScroll)
    // 初始化時執行一次
    handleScroll()
  }
})

onUnmounted(() => {
  const scrollContainer = document.querySelector('.snap-y.snap-mandatory')
  if (scrollContainer) {
    scrollContainer.removeEventListener('scroll', handleScroll)
  }
})
</script>

<style scoped>
.custom-anchor {
  @apply py-4;
}

.anchor-list {
  @apply list-none p-0 m-0;
}

.anchor-item {
  @apply flex items-center py-2 px-3 cursor-pointer transition-all duration-200 rounded-lg;
  @apply hover:bg-gray-100 dark:hover:bg-gray-800;
}

.anchor-item.active {
  @apply bg-blue-50 dark:bg-blue-900/20;
}

.anchor-item.active .anchor-dot {
  @apply bg-blue-500 scale-125;
}

.anchor-item.active .anchor-title {
  @apply text-blue-600 dark:text-blue-400 font-medium;
}

.anchor-dot {
  @apply w-2 h-2 rounded-full bg-gray-400 dark:bg-gray-600 mr-3 transition-all duration-200;
}

.anchor-title {
  @apply text-sm text-gray-600 dark:text-gray-300 transition-colors duration-200;
}
</style>
