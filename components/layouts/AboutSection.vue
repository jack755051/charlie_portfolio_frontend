<template>
  <ScrollSection :id="id" class="relative overflow-hidden py-20 md:py-24">
    <template #title>
      <div class="flex w-full items-center justify-center mb-12 md:mb-16 relative z-10">
        <div v-motion="motion.heading" class="relative pb-2 text-center group cursor-default">
          <h2
            class="font-display text-4xl md:text-5xl font-bold text-foreground tracking-tight transition-transform duration-500 hover:scale-105"
          >
            {{ titleMain }}
            <span
              class="text-transparent bg-clip-text bg-gradient-to-r from-primary via-rose-500 to-fuchsia-500"
            >
              {{ titleHighlight }}
            </span>
          </h2>
          <div
            class="absolute bottom-0 left-1/2 -translate-x-1/2 w-16 h-1.5 bg-gradient-to-r from-primary to-rose-400 rounded-full transition-all duration-300 group-hover:w-32"
          />
          <p class="mt-4 text-muted-foreground text-sm md:text-base font-medium">
            {{ subtitle }}
          </p>
        </div>
      </div>
    </template>

    <template #content>
      <div class="w-full max-w-7xl mx-auto px-5 sm:px-6 lg:px-10 relative z-10">
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

const motion = useMotionPresets()
</script>
