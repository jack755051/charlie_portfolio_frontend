<template>
  <div
    class="group relative bg-card rounded-2xl border border-border overflow-hidden transition-all duration-300 hover:shadow-xl hover:-translate-y-1 cursor-pointer flex flex-col h-full"
    :class="{ 'opacity-70 hover:opacity-100': status === 'archived' }"
    @click="handleClick"
  >
    <div
      class="h-1.5 w-full"
      :class="
        type === 'company'
          ? 'bg-sky-500'
          : status === 'archived'
            ? 'bg-slate-400'
            : status === 'wip'
              ? 'bg-amber-500'
              : 'bg-primary'
      "
    />

    <div class="p-6 flex flex-col flex-1">
      <div class="flex justify-between items-start mb-4 gap-3">
        <div class="flex-1 min-w-0">
          <h3
            class="text-xl font-bold text-foreground group-hover:text-primary transition-colors line-clamp-1"
            :title="title"
          >
            {{ title }}
          </h3>
        </div>
        <div
          class="w-8 h-8 shrink-0 rounded-full bg-muted flex items-center justify-center text-muted-foreground group-hover:bg-accent group-hover:text-accent-foreground transition-colors"
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

      <p class="text-muted-foreground text-sm leading-relaxed mb-6 line-clamp-3 flex-1">
        {{ description }}
      </p>

      <div class="flex flex-wrap gap-2 mt-auto pt-4 border-t border-border">
        <span
          v-for="(tech, index) in displayTechnologies"
          :key="index"
          class="px-2.5 py-1 rounded-md text-[11px] font-bold bg-muted text-muted-foreground border border-border group-hover:border-primary/40 group-hover:text-primary transition-colors"
        >
          {{ tech.name }}
        </span>
        <span
          v-if="remainingTechCount > 0"
          class="px-2.5 py-1 rounded-md text-[11px] font-bold bg-muted text-muted-foreground/70"
        >
          +{{ remainingTechCount }}
        </span>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { computed } from 'vue'
import type { IPortfolioMetadata } from '~/types/portfolio.interface'

interface Props {
  id: string
  title: string
  description: string
  role?: string
  duration?: string
  technologies: IPortfolioMetadata['technologies']
  type?: 'company' | 'personal'
  maxTechDisplay?: number
  source?: 'manual' | 'github'
  status?: 'wip' | 'done' | 'archived'
  stars?: number
}

const props = withDefaults(defineProps<Props>(), {
  type: 'company',
  maxTechDisplay: 4,
  role: '',
  duration: '',
  source: 'manual',
  status: undefined,
  stars: 0,
})

const emit = defineEmits<{
  click: [id: string]
}>()

const displayTechnologies = computed(() => props.technologies.slice(0, props.maxTechDisplay))
const remainingTechCount = computed(() =>
  Math.max(0, props.technologies.length - props.maxTechDisplay)
)
const handleClick = () => emit('click', props.id)
</script>
