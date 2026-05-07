<template>
  <div
    v-motion="motion.subtleCard"
    class="h-full bg-card rounded-2xl p-5 border border-border shadow-sm hover:shadow-md transition-all duration-300 group relative overflow-hidden flex flex-col"
  >
    <div
      class="absolute -right-10 -top-10 w-24 h-24 bg-accent/40 rounded-full blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"
    />

    <div class="relative z-10 mb-4">
      <h3 class="text-base font-bold text-foreground flex items-center gap-2">
        {{ title }}
      </h3>
      <p
        v-if="description"
        class="text-[10px] text-muted-foreground font-medium uppercase tracking-wider mt-0.5"
      >
        {{ description }}
      </p>
    </div>

    <div class="relative z-10 grid grid-cols-2 sm:grid-cols-3 gap-3 mt-auto">
      <div
        v-for="(item, index) in stack"
        :key="index"
        class="flex flex-col items-center justify-center p-2.5 rounded-lg bg-muted border border-border group/item hover:bg-card hover:border-primary/40 hover:shadow-sm transition-all duration-300 cursor-default"
      >
        <div class="w-6 h-6 mb-1.5 transition-transform duration-300 group-hover/item:scale-110">
          <component
            :is="getIconComponent(item.iconName)"
            v-if="getIconComponent(item.iconName)"
            class="w-full h-full fill-current"
            :class="item.color || 'text-muted-foreground'"
          />
          <div
            v-else
            class="w-full h-full bg-muted-foreground/20 rounded flex items-center justify-center text-[10px] font-bold text-muted-foreground"
          >
            ?
          </div>
        </div>

        <span
          class="text-[11px] font-semibold text-muted-foreground group-hover/item:text-foreground text-center leading-tight truncate w-full"
        >
          {{ item.name }}
        </span>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import type { ITechItem } from '~/composables/useTechStack'
import { getIconComponent } from '~/utils/iconMap'

interface Props {
  title: string
  description?: string
  stack: ITechItem[]
}

defineProps<Props>()
const motion = useMotionPresets()
</script>
