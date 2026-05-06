<template>
  <div
    class="min-h-screen bg-background text-foreground relative pb-32 transition-colors duration-500"
  >
    <BackgroundDecor variant="subpage" density="subtle" />
    <div
      class="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[500px] bg-gradient-to-b from-card/80 to-transparent pointer-events-none z-0"
    />

    <div class="sticky top-0 z-30 w-full px-5 sm:px-6 py-3 md:py-4 pointer-events-none">
      <div
        class="max-w-7xl mx-auto flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between"
      >
        <button
          class="pointer-events-auto inline-flex w-fit max-w-full items-center gap-2 px-4 py-2 rounded-full bg-card/90 backdrop-blur border border-border text-foreground hover:border-primary/40 hover:text-primary hover:shadow-md transition-all active:scale-95 group shadow-sm"
          @click="goBack"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="h-4 w-4 transition-transform group-hover:-translate-x-1"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M10 19l-7-7m0 0l7-7m-7 7h18"
            />
          </svg>
          <span class="text-sm font-bold">{{ $t('portfolio.detail.back') }}</span>
        </button>

        <a
          v-if="projectLink"
          :href="projectLink"
          target="_blank"
          class="pointer-events-auto inline-flex w-fit max-w-full items-center justify-center gap-2 px-5 py-2 bg-foreground text-background text-sm font-bold rounded-full hover:bg-primary hover:text-primary-foreground transition-colors shadow-lg"
        >
          <span>{{ $t('portfolio.detail.visitLive') }}</span>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="h-4 w-4"
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
        </a>
      </div>
    </div>

    <div v-if="projectMeta" class="relative z-10 max-w-7xl mx-auto px-6 pt-6">
      <div class="text-center max-w-4xl mx-auto mb-12">
        <div
          v-if="displayRole || displayDuration"
          class="flex items-center justify-center gap-3 mb-4"
        >
          <span
            v-if="displayRole"
            class="px-3 py-1 rounded-full text-xs font-bold bg-accent text-accent-foreground border border-primary/20"
          >
            {{ displayRole }}
          </span>
          <span
            v-if="displayRole && displayDuration"
            class="w-1 h-1 rounded-full bg-muted-foreground"
          />
          <span v-if="displayDuration" class="text-muted-foreground text-sm font-mono">
            {{ displayDuration }}
          </span>
        </div>

        <h1
          class="font-display text-4xl md:text-6xl font-extrabold text-foreground tracking-tight leading-tight mb-6"
        >
          {{ displayTitle }}
        </h1>

        <p class="text-lg text-muted-foreground leading-relaxed max-w-2xl mx-auto">
          {{ displayDescription }}
        </p>
      </div>

      <div v-if="detailScreenshots.length" class="mb-16 relative group">
        <div
          class="absolute -inset-1 bg-gradient-to-r from-primary to-sky-500 rounded-[2rem] opacity-20 blur-xl group-hover:opacity-30 transition-opacity duration-500"
        />
        <img
          :src="detailScreenshots[0].url"
          class="relative w-full h-auto object-cover rounded-[1.5rem] shadow-2xl border border-border bg-card"
          alt="Project Screenshot"
        />
      </div>

      <div class="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
        <div class="lg:col-span-8 space-y-10">
          <div class="prose max-w-none">
            <h3 class="text-2xl font-bold text-foreground mb-4 flex items-center gap-2">
              {{ $t('portfolio.detail.about') }}
            </h3>
            <p
              class="text-muted-foreground leading-relaxed text-justify whitespace-pre-line text-lg"
            >
              {{ displaySummary }}
            </p>
          </div>

          <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div class="bg-card p-6 rounded-2xl border border-border shadow-sm">
              <h4 class="font-bold text-foreground mb-4 flex items-center gap-2">
                {{ $t('portfolio.detail.features') }}
              </h4>
              <ul class="space-y-3">
                <li
                  v-for="(feat, i) in featuresList"
                  :key="i"
                  class="flex gap-3 text-sm text-muted-foreground"
                >
                  <span class="text-sky-500 font-bold">•</span>
                  {{ feat }}
                </li>
              </ul>
            </div>

            <div class="bg-card p-6 rounded-2xl border border-border shadow-sm">
              <h4 class="font-bold text-foreground mb-4 flex items-center gap-2">
                {{ $t('portfolio.detail.achievements') }}
              </h4>
              <ul class="space-y-3">
                <li
                  v-for="(ach, i) in achievementsList"
                  :key="i"
                  class="flex gap-3 text-sm text-muted-foreground"
                >
                  <span class="text-green-500 font-bold">✓</span>
                  {{ ach }}
                </li>
              </ul>
            </div>
          </div>

          <div v-if="detailScreenshots.length > 1" class="space-y-6">
            <h3 class="text-2xl font-bold text-foreground">
              {{ $t('portfolio.detail.gallery') }}
            </h3>
            <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div
                v-for="(shot, idx) in detailScreenshots.slice(1)"
                :key="idx"
                class="group relative rounded-2xl overflow-hidden border border-border shadow-sm hover:shadow-lg transition-all duration-300"
              >
                <img
                  :src="shot.url"
                  :alt="shot.caption ?? 'Project Screenshot'"
                  class="w-full h-auto object-cover transform group-hover:scale-105 transition-transform duration-700"
                />
              </div>
            </div>
          </div>
        </div>

        <div class="lg:col-span-4 relative">
          <div class="sticky top-24 space-y-6">
            <div class="bg-card rounded-3xl p-6 border border-border shadow-xl shadow-foreground/5">
              <h3 class="text-lg font-bold text-foreground mb-4">
                {{ $t('portfolio.detail.techUsed') }}
              </h3>
              <div class="flex flex-wrap gap-2">
                <div
                  v-for="(tech, index) in projectMeta.technologies || []"
                  :key="index"
                  class="flex items-center gap-2 px-3 py-2 bg-muted border border-border rounded-lg"
                >
                  <span class="text-xs font-bold text-foreground">{{ tech.name }}</span>
                </div>
              </div>
            </div>

            <div
              class="bg-foreground rounded-3xl p-6 text-background shadow-xl relative overflow-hidden"
            >
              <div
                class="absolute top-0 right-0 -mt-4 -mr-4 w-24 h-24 bg-primary rounded-full blur-2xl opacity-30"
              />
              <h3 class="text-lg font-bold mb-4 relative z-10">
                {{ $t('portfolio.detail.projectInfo') }}
              </h3>
              <div class="space-y-4 relative z-10 text-sm">
                <div class="flex justify-between border-b border-background/20 pb-2">
                  <span class="text-background/60">{{ $t('portfolio.detail.type') }}</span>
                  <span class="font-medium">{{ $t(projectTypeKey) }}</span>
                </div>
                <div class="flex justify-between border-b border-background/20 pb-2">
                  <span class="text-background/60">{{ $t('portfolio.detail.role') }}</span>
                  <span class="font-medium">{{ displayRole || '-' }}</span>
                </div>
                <div class="flex justify-between border-b border-background/20 pb-2">
                  <span class="text-background/60">{{ $t('portfolio.detail.timeline') }}</span>
                  <span class="font-medium">{{ displayDuration || '-' }}</span>
                </div>
              </div>

              <a
                v-if="projectLink"
                :href="projectLink"
                target="_blank"
                class="mt-6 w-full flex items-center justify-center gap-2 px-4 py-3 bg-background text-foreground font-bold rounded-xl hover:bg-primary hover:text-primary-foreground transition-all"
              >
                {{ $t('portfolio.detail.openProject') }}
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  class="h-4 w-4"
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
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div v-else class="flex flex-col items-center justify-center min-h-[60vh] gap-4">
      <p class="text-2xl font-bold text-muted-foreground">{{ $t('portfolio.detail.notFound') }}</p>
      <button class="text-primary font-bold hover:underline" @click="goBack">
        {{ $t('portfolio.detail.return') }}
      </button>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useI18n } from 'vue-i18n'
import BackgroundDecor from '~/components/base/background-decor.vue'
import { useGithubProjectDetails } from '~/composables/useGithubProjectDetails'
import { usePortfolioProjects } from '~/composables/usePortfolioProjects'

definePageMeta({ layout: 'portfolio-detail' })

const router = useRouter()
const route = useRoute()
const { tm, locale } = useI18n()
const { findProjectById } = usePortfolioProjects()
const { findDetailById } = useGithubProjectDetails()

const projectId = computed(() => {
  const { id } = route.query
  if (Array.isArray(id)) return id[0] ?? ''
  return id ?? ''
})

const projectMeta = computed(() => findProjectById(projectId.value))
const projectLink = computed(() => projectMeta.value?.link ?? undefined)
const isZh = computed(() => locale.value !== 'en')
const githubDetail = computed(() =>
  projectMeta.value?.source === 'github' ? findDetailById(projectMeta.value.id) : null
)
const projectI18nBasePath = computed(() =>
  projectMeta.value?.source === 'manual'
    ? `${projectMeta.value.i18nNamespace}.${projectMeta.value.id}`
    : ''
)

const projectTypeKey = computed(() => {
  return projectMeta.value?.projectType === 'company'
    ? 'portfolio.company'
    : 'portfolio.sideProject'
})

const displayTitle = computed(() => {
  if (!projectMeta.value) return ''
  if (projectMeta.value.source === 'github') {
    return (
      (isZh.value ? projectMeta.value.titleZhOverride : null) ||
      projectMeta.value.titleOverride ||
      ''
    )
  }
  return projectI18nBasePath.value ? String(tm(`${projectI18nBasePath.value}.title`)) : ''
})

const displayRole = computed(() => {
  if (!projectMeta.value) return ''
  if (projectMeta.value.source === 'github') return projectMeta.value.roleOverride || ''
  return projectI18nBasePath.value ? String(tm(`${projectI18nBasePath.value}.role`)) : ''
})

const displayDuration = computed(() => {
  if (!projectMeta.value) return ''
  if (projectMeta.value.source === 'github') return projectMeta.value.durationOverride || ''
  return projectI18nBasePath.value ? String(tm(`${projectI18nBasePath.value}.duration`)) : ''
})

const displayDescription = computed(() => {
  if (!projectMeta.value) return ''
  if (projectMeta.value.source === 'github') {
    const localizedOverride = isZh.value
      ? projectMeta.value.descriptionZhOverride
      : projectMeta.value.descriptionOverride
    return localizedOverride || projectMeta.value.descriptionOverride || ''
  }
  return projectI18nBasePath.value ? String(tm(`${projectI18nBasePath.value}.description`)) : ''
})

const displaySummary = computed(() => {
  if (!projectMeta.value) return ''
  if (projectMeta.value.source === 'github') {
    return (
      (isZh.value ? githubDetail.value?.summaryZh : githubDetail.value?.summaryEn) ||
      displayDescription.value
    )
  }
  return displayDescription.value
})

const toMessageArray = (messagePath: string) => {
  if (!messagePath) return []

  const messages = tm(messagePath) as unknown
  return Array.isArray(messages) ? messages : []
}

const featuresList = computed(() => {
  if (projectMeta.value?.source === 'github') {
    return isZh.value
      ? (githubDetail.value?.featuresZh ?? [])
      : (githubDetail.value?.featuresEn ?? [])
  }
  return toMessageArray(
    projectI18nBasePath.value ? `${projectI18nBasePath.value}.features` : ''
  ).map(item => String(item))
})

const achievementsList = computed(() => {
  if (projectMeta.value?.source === 'github') {
    return isZh.value
      ? (githubDetail.value?.achievementsZh ?? [])
      : (githubDetail.value?.achievementsEn ?? [])
  }
  return toMessageArray(
    projectI18nBasePath.value ? `${projectI18nBasePath.value}.achievements` : ''
  ).map(item => String(item))
})

const detailScreenshots = computed(() => {
  if (!projectMeta.value) return []
  if (projectMeta.value.source === 'github') {
    return githubDetail.value?.screenshots?.length
      ? githubDetail.value.screenshots
      : (projectMeta.value.screenshots ?? [])
  }
  return projectMeta.value.screenshots ?? []
})

const goBack = () => {
  router.push('/portfolio')
}
</script>
