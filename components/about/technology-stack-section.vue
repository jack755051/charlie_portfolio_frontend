<template>
  <AboutSection
    id="section3"
    ref="technologyStackSection"
    :title-main="$t('about.section3.titleMain')"
    :title-highlight="$t('about.section3.titleHighlight')"
    :subtitle="$t('about.section3.subtitle')"
  >
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
      <CTechCard
        v-for="(category, index) in techStore.techStack.value"
        :key="index"
        :title="$t(category.titleKey)"
        :description="$t(category.descriptionKey)"
        :stack="category.items"
        :class="category.class"
      />

      <div
        class="col-span-1 md:col-span-2 lg:col-span-2 bg-foreground rounded-3xl p-8 flex flex-col md:flex-row items-center justify-between shadow-xl shadow-foreground/10 text-background relative overflow-hidden group border border-foreground/10"
      >
        <div
          class="absolute inset-0 bg-gradient-to-r from-primary to-amber-500 opacity-0 group-hover:opacity-20 transition-opacity duration-500 pointer-events-none"
        />
        <div
          class="absolute -right-10 -top-10 w-40 h-40 bg-background opacity-5 rounded-full blur-3xl pointer-events-none"
        />

        <div class="z-10 mb-6 md:mb-0 text-center md:text-left relative">
          <h3
            class="text-2xl font-bold mb-3 flex items-center justify-center md:justify-start gap-2 text-background"
          >
            {{ $t('about.section3.evolution.title') }}
          </h3>
          <div class="text-background/70 text-sm leading-relaxed space-y-2">
            <p>{{ $t('about.section3.evolution.contentLead') }}</p>
            <p>
              {{ $t('about.section3.evolution.currentlyStudyingPrefix') }}
              <span class="font-semibold text-background">{{
                $t('about.section3.evolution.focusTopic1')
              }}</span>
              {{ $t('about.section3.evolution.connector') }}
              <span class="font-semibold text-background">{{
                $t('about.section3.evolution.focusTopic2')
              }}</span
              >{{ $t('about.section3.evolution.suffix') }}
            </p>
          </div>
        </div>

        <button
          class="z-10 px-6 py-3 bg-background text-foreground font-bold rounded-full hover:bg-accent hover:text-accent-foreground transition-all shadow-lg flex items-center gap-2 active:scale-95 group/btn"
          @click="handlerDownloadResume"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="h-5 w-5 group-hover/btn:animate-bounce"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"
            />
          </svg>
          <span>{{ $t('about.section3.evolution.downloadResume') }}</span>
        </button>
      </div>
    </div>
  </AboutSection>
</template>

<script setup lang="ts">
import AboutSection from '~/components/layouts/AboutSection.vue'
import { useTechStack } from '~/composables/useTechStack'
import CTechCard from '~/components/base/tech-card.vue'

const techStore = useTechStack()
const handlerDownloadResume = () => {
  window.open('/charlie_portfolio_frontend/charlie-resume-2026.pdf', '_blank')
}
</script>
