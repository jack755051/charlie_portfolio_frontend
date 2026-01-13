<template>
  <div class="custom-anchor-nav">
    <ul class="anchor-list">
      <li 
        v-for="item in anchorData" 
        :key="item.key"
        class="anchor-item"
        :class="{ 'active': activeAnchor === item.key }"
        @click="scrollToSection(item.key, item.href)"
      >
        <div class="anchor-dot"></div>
        <span class="anchor-title">{{ item.title }}</span>
      </li>
    </ul>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue';
import type { IAnchor } from '~/types/anchor.interface';

interface Props {
    anchorData?: IAnchor[],
    affix?: boolean
}

const props = defineProps<Props>()
const activeAnchor = ref<string>('')

// 滾動到指定區塊
const scrollToSection = (sectionKey: string, href: string) => {
    const sectionId = href.replace('#', '')
    const targetElement = document.getElementById(sectionId)
    
    if (targetElement) {
        // 使用 scrollIntoView 進行平滑滾動
        targetElement.scrollIntoView({ 
            behavior: 'smooth',
            block: 'start'
        })
        
        // 立即更新活躍狀態
        activeAnchor.value = sectionKey
    }
}

// 監聽滾動事件來更新當前活躍的錨點
const handleScroll = () => {
    if (!props.anchorData) return
    
    const scrollContainer = document.querySelector('.snap-y.snap-mandatory')
    if (!scrollContainer) return
    
    // 獲取所有 section 元素
    const sections = props.anchorData.map(item => {
        const sectionId = item.href.replace('#', '')
        return {
            key: item.key,
            element: document.getElementById(sectionId)
        }
    }).filter(item => item.element)
    
    // 找到當前視窗中的區塊
    let currentSection = sections[0]?.key || ''
    
    for (const section of sections) {
        if (section.element) {
            const rect = section.element.getBoundingClientRect()
            // 如果區塊的頂部在視窗上半部分，則認為是當前區塊
            if (rect.top <= window.innerHeight / 2 && rect.bottom > 0) {
                currentSection = section.key
            }
        }
    }
    
    activeAnchor.value = currentSection
}

let scrollTimer: number | null = null

// 節流處理滾動事件
const throttledHandleScroll = () => {
    if (scrollTimer) return
    
    scrollTimer = requestAnimationFrame(() => {
        handleScroll()
        scrollTimer = null
    })
}

onMounted(() => {
    const scrollContainer = document.querySelector('.snap-y.snap-mandatory')
    if (scrollContainer) {
        scrollContainer.addEventListener('scroll', throttledHandleScroll, { passive: true })
        // 初始化時執行一次
        handleScroll()
    }
})

onUnmounted(() => {
    const scrollContainer = document.querySelector('.snap-y.snap-mandatory')
    if (scrollContainer) {
        scrollContainer.removeEventListener('scroll', throttledHandleScroll)
    }
    if (scrollTimer) {
        cancelAnimationFrame(scrollTimer)
    }
})
</script>

<style scoped>
.custom-anchor-nav {
  padding: 16px 12px;
  background: rgba(255, 255, 255, 0.9);
  backdrop-filter: blur(10px);
  border-radius: 12px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  border: 1px solid rgba(0, 0, 0, 0.1);
}

.anchor-list {
  list-style: none;
  padding: 0;
  margin: 0;
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.anchor-item {
  display: flex;
  align-items: center;
  padding: 8px 12px;
  cursor: pointer;
  transition: all 0.2s ease;
  border-radius: 8px;
  position: relative;
}

.anchor-item:hover {
  background: rgba(59, 130, 246, 0.1);
}

.anchor-item.active {
  background: rgba(59, 130, 246, 0.15);
}

.anchor-item.active .anchor-dot {
  background: #3b82f6;
  transform: scale(1.2);
}

.anchor-item.active .anchor-title {
  color: #3b82f6;
  font-weight: 500;
}

.anchor-dot {
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background: #9ca3af;
  margin-right: 12px;
  transition: all 0.2s ease;
  flex-shrink: 0;
}

.anchor-title {
  font-size: 14px;
  color: #6b7280;
  transition: color 0.2s ease;
  white-space: nowrap;
}

/* 深色模式支持 */
@media (prefers-color-scheme: dark) {
  .custom-anchor-nav {
    background: rgba(17, 24, 39, 0.9);
    border: 1px solid rgba(255, 255, 255, 0.1);
  }
  
  .anchor-item:hover {
    background: rgba(59, 130, 246, 0.2);
  }
  
  .anchor-item.active {
    background: rgba(59, 130, 246, 0.25);
  }
  
  .anchor-dot {
    background: #6b7280;
  }
  
  .anchor-title {
    color: #9ca3af;
  }
  
  .anchor-item.active .anchor-title {
    color: #60a5fa;
  }
}
</style>