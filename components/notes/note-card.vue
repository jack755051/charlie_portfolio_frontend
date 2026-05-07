<template>
  <a
    v-motion="motion.card"
    :href="url"
    target="_blank"
    rel="noopener noreferrer"
    class="group relative bg-card rounded-2xl border border-border overflow-hidden transition-all duration-300 hover:shadow-xl flex flex-col h-full"
  >
    <div
      class="h-1.5 w-full"
      :class="featured ? 'bg-gradient-to-r from-primary to-rose-500' : 'bg-muted'"
    />

    <div class="p-6 flex flex-col flex-1">
      <div class="flex items-center gap-2 mb-3 flex-wrap">
        <span
          v-if="featured"
          class="text-[10px] font-bold uppercase tracking-wide px-2 py-0.5 rounded bg-primary/15 text-primary border border-primary/30"
        >
          ★ {{ $t('notes.featured') }}
        </span>
        <span class="text-xs font-mono text-muted-foreground">
          {{ $t('notes.publishedAt') }} {{ publishedAt }}
        </span>
      </div>

      <h3
        class="text-lg md:text-xl font-bold text-foreground group-hover:text-primary transition-colors line-clamp-2 mb-2"
      >
        {{ title }}
      </h3>

      <p class="text-muted-foreground text-sm leading-relaxed line-clamp-3 flex-1 mb-4">
        {{ summary }}
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

      <div
        class="mt-4 text-xs font-mono text-primary flex items-center gap-1 group-hover:gap-2 transition-all"
      >
        <span>{{ $t('notes.readOnHackmd') }}</span>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          class="h-3.5 w-3.5"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
          />
        </svg>
      </div>
    </div>
  </a>
</template>

<script setup lang="ts">
interface Props {
  id: string
  url: string
  title: string
  summary: string
  tags: string[]
  publishedAt: string
  featured: boolean
}
defineProps<Props>()
const motion = useMotionPresets()
</script>
