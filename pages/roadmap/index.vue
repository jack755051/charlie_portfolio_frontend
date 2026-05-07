<template>
  <div
    v-motion="motion.page"
    class="scrollable-content-wrapper min-h-screen overflow-hidden relative bg-background text-foreground transition-colors duration-500 pb-24"
  >
    <BackgroundDecor variant="subpage" />

    <div class="relative z-10 max-w-7xl mx-auto px-5 sm:px-8 lg:px-10 pt-14 md:pt-20">
      <!-- Hero / Intro -->
      <header v-motion="motion.heading" class="text-center max-w-3xl mx-auto mb-16">
        <h1
          class="font-display text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight leading-tight"
        >
          <span class="text-foreground">{{ $t('roadmap.titleMain') }}</span>
          <span
            class="text-transparent bg-clip-text bg-gradient-to-r from-primary via-rose-500 to-fuchsia-500"
          >
            {{ $t('roadmap.titleHighlight') }}
          </span>
        </h1>
        <p class="mt-4 text-muted-foreground text-sm md:text-base font-medium">
          {{ $t('roadmap.subtitle') }}
        </p>
        <p class="mt-6 text-base md:text-lg text-muted-foreground leading-relaxed">
          {{ $t('roadmap.intro') }}
        </p>
      </header>

      <!-- Three horizon sections -->
      <div class="space-y-16">
        <section
          v-for="horizon in horizons"
          :key="horizon.key"
          v-motion="motion.section"
          class="relative"
        >
          <!-- Horizon header (sticky-like visual marker) -->
          <div class="flex items-start gap-4 mb-8">
            <div
              class="flex-shrink-0 w-12 h-12 rounded-2xl flex items-center justify-center text-background font-display font-bold text-lg shadow-lg"
              :class="horizon.markerClass"
            >
              {{ horizon.icon }}
            </div>
            <div class="flex-1">
              <h2 class="font-display text-2xl md:text-3xl font-bold text-foreground">
                {{ $t(`roadmap.horizons.${horizon.key}.title`) }}
              </h2>
              <p class="text-sm md:text-base text-muted-foreground mt-1">
                {{ $t(`roadmap.horizons.${horizon.key}.description`) }}
              </p>
            </div>
          </div>

          <div
            v-if="itemsByHorizon[horizon.key].length"
            class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 pl-0 md:pl-16"
          >
            <RoadmapItemCard
              v-for="item in itemsByHorizon[horizon.key]"
              :key="item.id"
              :title="$t(`${item.i18nNamespace}.${item.id}.title`)"
              :description="$t(`${item.i18nNamespace}.${item.id}.description`)"
              :category="item.category"
              :status="item.status"
              :tags="item.tags"
            />
          </div>

          <div v-else class="text-center text-muted-foreground py-8 pl-0 md:pl-16">—</div>
        </section>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import BackgroundDecor from '~/components/base/background-decor.vue'
import RoadmapItemCard from '~/components/roadmap/roadmap-item-card.vue'
import { useRoadmap } from '~/composables/useRoadmap'

const { itemsByHorizon } = useRoadmap()
const motion = useMotionPresets()

const horizons = [
  {
    key: 'short' as const,
    icon: '1-3M',
    markerClass: 'bg-gradient-to-br from-emerald-500 to-sky-500',
  },
  {
    key: 'mid' as const,
    icon: '6M',
    markerClass: 'bg-gradient-to-br from-amber-500 to-primary',
  },
  {
    key: 'long' as const,
    icon: '1-2Y',
    markerClass: 'bg-gradient-to-br from-fuchsia-500 to-primary',
  },
]
</script>
