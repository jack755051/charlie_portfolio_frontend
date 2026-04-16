<template>
  <div class="scrollable-content-wrapper h-screen overflow-hidden relative bg-slate-50">
    <CAnchor
      :anchor-data="anchorData.anchorPortfolioPage.value"
      class="fixed left-4 top-1/2 transform -translate-y-1/2 z-50"
    />

    <div
      class="snap-y snap-mandatory h-full overflow-y-scroll scroll-smooth pt-[80px] relative z-10"
    >
      <div class="w-full pb-20">
        <ScrollSection id="section1" ref="portfolioSection" :class="['flex-col !justify-start']">
          <template #title>
            <div class="flex w-full items-center justify-center mb-16 relative z-10">
              <h2
                class="text-4xl md:text-5xl font-bold text-slate-800 tracking-tight transition-transform duration-500 hover:scale-105"
              >
                {{ $t('portfolio.titleMain') }}
                <span
                  class="text-transparent bg-clip-text bg-gradient-to-r from-orange-500 to-amber-500 animate-gradient-x"
                >
                  {{ $t('portfolio.titleHighlight') }}
                </span>
              </h2>
            </div>
          </template>

          <template #content>
            <div
              v-if="publishedProjects.length === 0"
              class="flex flex-col items-center justify-center h-64 text-slate-400"
            >
              <div class="text-6xl mb-4">📂</div>
              <p>{{ $t('portfolio.empty') }}</p>
            </div>

            <div v-else class="w-full max-w-7xl mx-auto px-6 space-y-20">
              <div v-if="companyProjects.length > 0" class="space-y-8">
                <h3 class="text-2xl font-bold text-slate-800">{{ $t('portfolio.company') }}</h3>
                <div class="flex-1 h-px bg-slate-200"></div>

                <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                  <CPortfolioCard
                    v-for="project in companyProjects"
                    :key="project.id"
                    v-bind="project"
                    type="company"
                    @click="handleCardClick"
                  />
                </div>
              </div>

              <div v-if="personalProjects.length > 0" class="space-y-8">
                <h3 class="text-2xl font-bold text-slate-800">{{ $t('portfolio.sideProject') }}</h3>
                <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                  <CPortfolioCard
                    v-for="project in personalProjects"
                    :key="project.id"
                    v-bind="project"
                    type="personal"
                    @click="handleCardClick"
                  />
                </div>
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
import CPortfolioCard from '~/components/base/portfolio-card.vue'
import ScrollSection from '~/layouts/scrollSection.vue'

const anchorData = useAnchor()
const router = useRouter()
const { t } = useI18n() // 2. 獲取 t 函式
const {
  publishedProjects,
  companyProjects: companySource,
  personalProjects: personalSource,
} = usePortfolioProjects()

// 輔助函式：將 Metadata 加上翻譯文字
// 這樣 CPortfolioCard 透過 v-bind 就能拿到 title, description, role
const enrichProject = (project: any) => ({
  ...project,
  title: t(`${project.i18nNamespace}.${project.id}.title`),
  description: t(`${project.i18nNamespace}.${project.id}.description`),
  role: t(`${project.i18nNamespace}.${project.id}.role`),
  duration: t(`${project.i18nNamespace}.${project.id}.duration`),
  // 如果你的 Card 需要 tags，這裡可能需要 mapping，或者 Card 內部自己處理
})

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
