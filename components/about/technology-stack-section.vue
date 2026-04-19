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
          type="button"
          class="z-10 px-6 py-3 bg-background text-foreground font-bold rounded-full hover:bg-accent hover:text-accent-foreground transition-all shadow-lg flex items-center gap-2 active:scale-95 group/btn"
          @click="resumeModalOpen = true"
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
              d="M15 12a3 3 0 11-6 0 3 3 0 016 0z M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
            />
          </svg>
          <span>{{ $t('resume.preview') }}</span>
        </button>
      </div>
    </div>

    <ResumePreviewModal v-model="resumeModalOpen" />
  </AboutSection>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import AboutSection from '~/components/layouts/AboutSection.vue'
import { useTechStack } from '~/composables/useTechStack'
import CTechCard from '~/components/base/tech-card.vue'
import ResumePreviewModal from '~/components/about/resume-preview-modal.vue'

const techStore = useTechStack()
const resumeModalOpen = ref(false)
</script>
