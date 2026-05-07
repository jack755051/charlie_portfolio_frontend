<template>
  <div
    v-motion="motion.subtleCard"
    class="group relative bg-card rounded-2xl border border-border p-5 sm:p-6 transition-all duration-300 hover:shadow-lg flex flex-col h-full"
  >
    <div class="flex items-center gap-2 mb-3 flex-wrap">
      <span
        class="text-[10px] font-bold uppercase tracking-wide px-2 py-0.5 rounded"
        :class="categoryBadgeClass"
      >
        {{ $t(`roadmap.categories.${category}`) }}
      </span>
      <span
        class="text-[10px] font-bold uppercase tracking-wide px-2 py-0.5 rounded"
        :class="statusBadgeClass"
      >
        {{ $t(`roadmap.statuses.${status}`) }}
      </span>
    </div>

    <h4 class="text-lg font-bold text-foreground mb-2 leading-snug">
      {{ title }}
    </h4>

    <p class="text-sm text-muted-foreground leading-relaxed mb-4 flex-1">
      {{ description }}
    </p>

    <div class="flex flex-wrap gap-1.5 mt-auto pt-3 border-t border-border">
      <span
        v-for="tag in tags"
        :key="tag"
        class="px-2 py-0.5 rounded text-[10px] font-bold bg-muted text-muted-foreground"
      >
        #{{ tag }}
      </span>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import type { RoadmapCategory, RoadmapStatus } from '~/types/roadmap.interface'

interface Props {
  title: string
  description: string
  category: RoadmapCategory
  status: RoadmapStatus
  tags: string[]
}
const props = defineProps<Props>()
const motion = useMotionPresets()

const categoryBadgeClass = computed(() => {
  switch (props.category) {
    case 'frontend':
      return 'bg-sky-500/15 text-sky-700 dark:text-sky-400 border border-sky-500/30'
    case 'backend':
      return 'bg-emerald-500/15 text-emerald-700 dark:text-emerald-400 border border-emerald-500/30'
    case 'infra':
      return 'bg-amber-500/15 text-amber-700 dark:text-amber-400 border border-amber-500/30'
    case 'ai':
      return 'bg-fuchsia-500/15 text-fuchsia-700 dark:text-fuchsia-400 border border-fuchsia-500/30'
    case 'career':
      return 'bg-primary/15 text-primary border border-primary/30'
    default:
      return 'bg-muted text-muted-foreground border border-border'
  }
})

const statusBadgeClass = computed(() => {
  switch (props.status) {
    case 'completed':
      return 'bg-emerald-500/15 text-emerald-700 dark:text-emerald-400 border border-emerald-500/30'
    case 'in-progress':
      return 'bg-amber-500/15 text-amber-700 dark:text-amber-400 border border-amber-500/30'
    case 'planning':
      return 'bg-slate-500/15 text-slate-600 dark:text-slate-400 border border-slate-500/30'
    default:
      return ''
  }
})
</script>
