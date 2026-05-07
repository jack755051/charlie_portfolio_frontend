<template>
  <div
    v-motion="motion.page"
    class="scrollable-content-wrapper h-screen overflow-hidden relative bg-background text-foreground transition-colors duration-500"
  >
    <BackgroundDecor variant="subpage" />

    <CAnchor
      :anchor-data="anchorData.anchorPortfolioPage.value"
      class="fixed left-2 xl:left-4 top-1/2 -translate-y-1/2 z-40"
    />

    <div
      class="snap-y snap-proximity h-full overflow-y-scroll scroll-smooth pt-14 md:pt-16 relative z-10"
    >
      <div class="w-full pb-20">
        <ScrollSection id="section1" :class="['flex-col !justify-start']">
          <template #title>
            <div class="flex w-full items-center justify-center mb-12 md:mb-16 relative z-10">
              <div v-motion="motion.heading" class="text-center space-y-5">
                <h2
                  class="font-display text-4xl md:text-5xl font-bold text-foreground tracking-tight transition-transform duration-500 hover:scale-105"
                >
                  {{ $t('portfolio.titleMain') }}
                  <span
                    class="text-transparent bg-clip-text bg-gradient-to-r from-orange-500 via-rose-500 to-fuchsia-500"
                  >
                    {{ $t('portfolio.titleHighlight') }}
                  </span>
                </h2>
                <p
                  class="inline-flex items-center rounded-full border border-border/70 bg-background/70 px-4 py-2 text-sm font-medium text-muted-foreground backdrop-blur"
                >
                  {{ $t('portfolio.company') }}
                </p>
              </div>
            </div>
          </template>

          <template #content>
            <div
              v-if="companyProjects.length === 0"
              class="flex flex-col items-center justify-center h-64 text-muted-foreground"
            >
              <div class="text-6xl mb-4">📂</div>
              <p>{{ $t('portfolio.empty') }}</p>
            </div>

            <div v-else class="w-full max-w-7xl mx-auto px-5 sm:px-8 lg:px-10">
              <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
                <CPortfolioCard
                  v-for="project in companyProjects"
                  :key="project.id"
                  v-bind="project"
                  type="company"
                  @click="handleCardClick"
                />
              </div>
            </div>
          </template>
        </ScrollSection>

        <ScrollSection id="section2" :class="['flex-col !justify-start']">
          <template #title>
            <div class="flex w-full items-center justify-center mb-12 md:mb-16 relative z-10">
              <div v-motion="motion.heading" class="text-center space-y-5">
                <p
                  class="inline-flex items-center rounded-full border border-border/70 bg-background/70 px-4 py-2 text-sm font-medium text-muted-foreground backdrop-blur"
                >
                  {{ $t('portfolio.sideProject') }}
                </p>
                <h2 class="font-display text-3xl md:text-4xl font-bold text-foreground">
                  {{ $t('portfolio.sideProject') }}
                </h2>
              </div>
            </div>
          </template>

          <template #content>
            <div
              v-if="personalProjects.length === 0"
              class="flex flex-col items-center justify-center h-64 text-muted-foreground"
            >
              <div class="text-6xl mb-4">🧪</div>
              <p>{{ $t('portfolio.empty') }}</p>
            </div>

            <div v-else class="w-full max-w-7xl mx-auto px-5 sm:px-8 lg:px-10">
              <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
                <CPortfolioCard
                  v-for="project in personalProjects"
                  :key="project.id"
                  v-bind="project"
                  type="personal"
                  @click="handleCardClick"
                />
              </div>
            </div>
          </template>
        </ScrollSection>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import { computed } from 'vue'
import { useRouter } from 'vue-router'
import { useI18n } from 'vue-i18n' // 1. 引入 useI18n
import { useAnchor } from '~/composables/useAnchor'
import { usePortfolioProjects } from '~/composables/usePortfolioProjects'
import CAnchor from '~/components/base/anchor.vue'
import BackgroundDecor from '~/components/base/background-decor.vue'
import CPortfolioCard from '~/components/base/portfolio-card.vue'
import ScrollSection from '~/layouts/scrollSection.vue'

const anchorData = useAnchor()
const motion = useMotionPresets()
const router = useRouter()
const { t } = useI18n() // 2. 獲取 t 函式
const { companyProjects: companySource, personalProjects: personalSource } = usePortfolioProjects()

// 輔助函式：將 Metadata 加上翻譯文字
// Manual 專案：從 i18n namespace 取文字
// GitHub 專案：優先用 override 中文，其次原文（英）
const { locale } = useI18n()
const isZh = computed(() => locale.value !== 'en')

const enrichProject = (project: any) => {
  if (project.source === 'github') {
    return {
      ...project,
      title: (isZh.value ? project.titleZhOverride : null) || project.titleOverride,
      description:
        (isZh.value ? project.descriptionZhOverride : null) || project.descriptionOverride || '',
      role: project.roleOverride || '',
      duration: project.durationOverride || '',
    }
  }
  return {
    ...project,
    title: t(`${project.i18nNamespace}.${project.id}.title`),
    description: t(`${project.i18nNamespace}.${project.id}.description`),
    role: t(`${project.i18nNamespace}.${project.id}.role`),
    duration: t(`${project.i18nNamespace}.${project.id}.duration`),
  }
}

const companyProjects = computed(() => {
  return companySource.value.map(enrichProject)
})

const personalProjects = computed(() => {
  return personalSource.value.map(enrichProject)
})

const handleCardClick = (projectId: string) => {
  router.push(`/portfolio/detail?id=${projectId}`)
}
</script>
