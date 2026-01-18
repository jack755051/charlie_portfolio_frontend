<template>
  <ScrollSection :id="id" class="relative overflow-hidden py-24">
    <div
      class="absolute top-20 -left-20 w-96 h-96 bg-orange-200/40 rounded-full blur-[100px] pointer-events-none"
    ></div>
    <div
      class="absolute bottom-0 -right-20 w-[500px] h-[500px] bg-blue-100/40 rounded-full blur-[100px] pointer-events-none -z-10"
    ></div>

    <template #title>
      <div class="flex w-full items-center justify-center mb-16 relative z-10">
        <div class="relative pb-2 text-center group cursor-default">
          <h2
            class="text-4xl md:text-5xl font-bold text-slate-800 tracking-tight transition-transform duration-500 hover:scale-105"
          >
            {{ titleMain }}
            <span
              class="text-transparent bg-clip-text bg-gradient-to-r from-orange-500 to-amber-500 animate-gradient-x"
            >
              {{ titleHighlight }}
            </span>
          </h2>
          <div
            class="absolute bottom-0 left-1/2 -translate-x-1/2 w-16 h-1.5 bg-gradient-to-r from-orange-500 to-amber-400 rounded-full transition-all duration-300 group-hover:w-32"
          ></div>
          <p class="mt-4 text-slate-500 text-sm md:text-base font-medium">
            {{ subtitle }}
          </p>
        </div>
      </div>
    </template>

    <template #content>
      <div class="w-full max-w-7xl mx-auto px-6 relative z-10">
        <slot />
      </div>
    </template>
  </ScrollSection>
</template>

<script setup lang="ts">
import ScrollSection from '~/layouts/scrollSection.vue'

// 定義 Props 讓外部傳入不同的標題文字
defineProps<{
  id: string
  titleMain: string // 標題黑色部分 (e.g. "About")
  titleHighlight: string // 標題漸層部分 (e.g. "Me.")
  subtitle: string // 下方灰色副標題
}>()
</script>
