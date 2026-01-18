<template>
  <div
    class="group relative bg-white rounded-2xl border border-slate-100 overflow-hidden transition-all duration-300 hover:shadow-xl hover:-translate-y-1 cursor-pointer flex flex-col h-full"
    @click="handleClick"
  >
    <div class="h-1.5 w-full" :class="type === 'company' ? 'bg-blue-500' : 'bg-orange-500'"></div>

    <div class="p-6 flex flex-col flex-1">
      <div class="flex justify-between items-start mb-4">
        <div class="flex-1">
          <h3
            class="text-xl font-bold text-slate-800 group-hover:text-orange-500 transition-colors line-clamp-1"
            :title="title"
          >
            {{ title }}
          </h3>
          <div class="flex items-center gap-2 mt-1 text-xs font-mono text-slate-400">
            <span class="px-2 py-0.5 rounded bg-slate-100 text-slate-500">{{ role }}</span>
            <span>•</span>
            <span>{{ duration }}</span>
          </div>
        </div>
        <div
          class="w-8 h-8 rounded-full bg-slate-50 flex items-center justify-center text-slate-400 group-hover:bg-orange-50 group-hover:text-orange-500 transition-colors"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="h-4 w-4 transform group-hover:rotate-45 transition-transform"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M14 5l7 7m0 0l-7 7m7-7H3"
            />
          </svg>
        </div>
      </div>

      <p class="text-slate-500 text-sm leading-relaxed mb-6 line-clamp-3 flex-1">
        {{ description }}
      </p>

      <div class="flex flex-wrap gap-2 mt-auto pt-4 border-t border-slate-50">
        <span
          v-for="(tech, index) in displayTechnologies"
          :key="index"
          class="px-2.5 py-1 rounded-md text-[11px] font-bold bg-slate-50 text-slate-600 border border-slate-100 group-hover:border-orange-100 group-hover:text-orange-600 transition-colors"
        >
          {{ tech.name }}
        </span>
        <span
          v-if="remainingTechCount > 0"
          class="px-2.5 py-1 rounded-md text-[11px] font-bold bg-slate-50 text-slate-400"
        >
          +{{ remainingTechCount }}
        </span>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import type { IPortfolioMetadata } from '~/types/portfolio.interface'

// 1. 如果你已經把 types/protfolio.interface 刪除了，這裡會報錯
// 建議改為從 store 或直接定義，或者引入新的 Metadata 介面

interface Props {
  id: string
  title: string
  description: string
  role: string
  duration: string
  // 2. 修改這裡：直接參考 Metadata 裡的 technologies，或是手寫 { name: string }[]
  technologies: IPortfolioMetadata['technologies']
  type?: 'company' | 'personal'
  maxTechDisplay?: number
}

const props = withDefaults(defineProps<Props>(), {
  type: 'company',
  maxTechDisplay: 4,
})

const emit = defineEmits<{
  click: [id: string]
}>()

// ... 其他邏輯完全不用動
const displayTechnologies = computed(() => props.technologies.slice(0, props.maxTechDisplay))
const remainingTechCount = computed(() =>
  Math.max(0, props.technologies.length - props.maxTechDisplay)
)

const handleClick = () => emit('click', props.id)
</script>
