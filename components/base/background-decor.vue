<template>
  <div class="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden="true">
    <!-- Blob 1：左上橘 -->
    <div
      class="absolute rounded-full blur-3xl animate-float-slow"
      :class="[
        blob1Class,
        isHome ? 'h-[420px] w-[420px] -top-24 -left-24' : 'h-[360px] w-[360px] -top-20 -left-20',
      ]"
    />
    <!-- Blob 2：右中粉 -->
    <div
      class="absolute rounded-full blur-3xl animate-float-slow"
      :class="[
        blob2Class,
        isHome ? 'h-[380px] w-[380px] top-1/3 -right-24' : 'h-[320px] w-[320px] top-1/4 -right-20',
      ]"
      style="animation-delay: -2s"
    />
    <!-- Blob 3：下中黃（僅 home） -->
    <div
      v-if="isHome"
      class="absolute rounded-full blur-3xl animate-float-slow bg-amber-300/25 dark:bg-indigo-500/15 h-[320px] w-[320px] bottom-0 left-1/3"
      style="animation-delay: -4s"
    />

    <!-- Dot grid -->
    <div class="absolute inset-0 dot-grid" :class="dotOpacityClass" />
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'

interface Props {
  variant?: 'home' | 'subpage'
  density?: 'normal' | 'subtle'
}

const props = withDefaults(defineProps<Props>(), {
  variant: 'subpage',
  density: 'normal',
})

const isHome = computed(() => props.variant === 'home')

const blob1Class = computed(() =>
  isHome.value ? 'bg-orange-400/30 dark:bg-orange-500/20' : 'bg-orange-200/40 dark:bg-orange-500/15'
)

const blob2Class = computed(() =>
  isHome.value ? 'bg-pink-400/25 dark:bg-fuchsia-500/15' : 'bg-blue-200/30 dark:bg-sky-500/10'
)

const dotOpacityClass = computed(() =>
  props.density === 'subtle' ? 'opacity-[0.15] dark:opacity-10' : 'opacity-[0.25] dark:opacity-20'
)
</script>

<style scoped>
.dot-grid {
  background-image: radial-gradient(circle at 1px 1px, rgba(15, 23, 42, 0.18) 1px, transparent 0);
  background-size: 22px 22px;
}
@media (prefers-color-scheme: dark) {
  .dot-grid {
    background-image: radial-gradient(
      circle at 1px 1px,
      rgba(148, 163, 184, 0.18) 1px,
      transparent 0
    );
  }
}

@media (prefers-reduced-motion: reduce) {
  :deep(.animate-float-slow) {
    animation: none !important;
  }
}
</style>
