<template>
  <div
    class="h-full bg-white rounded-2xl p-5 border border-slate-100 shadow-sm hover:shadow-md hover:-translate-y-1 transition-all duration-300 group relative overflow-hidden flex flex-col"
  >
    <div
      class="absolute -right-10 -top-10 w-24 h-24 bg-orange-50 rounded-full blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"
    ></div>

    <div class="relative z-10 mb-4">
      <h3 class="text-base font-bold text-slate-800 flex items-center gap-2">
        {{ title }}
      </h3>
      <p
        v-if="description"
        class="text-[10px] text-slate-400 font-medium uppercase tracking-wider mt-0.5"
      >
        {{ description }}
      </p>
    </div>

    <div class="relative z-10 grid grid-cols-2 sm:grid-cols-3 gap-3 mt-auto">
      <div
        v-for="(item, index) in stack"
        :key="index"
        class="flex flex-col items-center justify-center p-2.5 rounded-lg bg-slate-50 border border-slate-100 group/item hover:bg-white hover:border-orange-200 hover:shadow-sm transition-all duration-300 cursor-default"
      >
        <div class="w-6 h-6 mb-1.5 transition-transform duration-300 group-hover/item:scale-110">
          <component
            v-if="getIconComponent(item.iconName)"
            :is="getIconComponent(item.iconName)"
            class="w-full h-full fill-current"
            :class="item.color || 'text-slate-600'"
          />
          <div
            v-else
            class="w-full h-full bg-slate-200 rounded flex items-center justify-center text-[10px] font-bold text-slate-400"
          >
            ?
          </div>
        </div>

        <span
          class="text-[11px] font-semibold text-slate-600 group-hover/item:text-slate-900 text-center leading-tight truncate w-full"
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
</script>
