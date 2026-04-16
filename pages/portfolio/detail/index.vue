<template>
  <div class="min-h-screen bg-slate-50 relative pb-32">
    <div
      class="absolute inset-0 z-0 opacity-[0.4]"
      style="
        background-image: radial-gradient(#cbd5e1 1.5px, transparent 1.5px);
        background-size: 32px 32px;
      "
    ></div>
    <div
      class="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[500px] bg-gradient-to-b from-white/80 to-transparent pointer-events-none z-0"
    ></div>

    <div class="sticky top-0 z-50 w-full px-6 py-4">
      <div class="max-w-7xl mx-auto flex items-center justify-between">
        <button
          class="flex items-center gap-2 px-4 py-2 rounded-full bg-white/90 backdrop-blur border border-slate-200 text-slate-600 hover:border-orange-200 hover:text-orange-500 hover:shadow-md transition-all active:scale-95 group shadow-sm"
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
          class="hidden md:flex items-center gap-2 px-5 py-2 bg-slate-900 text-white text-sm font-bold rounded-full hover:bg-orange-500 transition-colors shadow-lg"
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
        <div class="flex items-center justify-center gap-3 mb-4">
          <span
            class="px-3 py-1 rounded-full text-xs font-bold bg-orange-100 text-orange-600 border border-orange-200"
          >
            {{ $t(i18nKeys.role) }}
          </span>
          <span class="w-1 h-1 rounded-full bg-slate-300"></span>
          <span class="text-slate-500 text-sm font-mono">
            {{ $t(i18nKeys.duration) }}
          </span>
        </div>

        <h1
          class="text-4xl md:text-6xl font-extrabold text-slate-900 tracking-tight leading-tight mb-6"
        >
          {{ $t(i18nKeys.title) }}
        </h1>

        <p class="text-lg text-slate-600 leading-relaxed max-w-2xl mx-auto">
          {{ $t(i18nKeys.description) }}
        </p>
      </div>

      <div v-if="projectMeta.screenshots?.length" class="mb-16 relative group">
        <div
          class="absolute -inset-1 bg-gradient-to-r from-orange-500 to-blue-500 rounded-[2rem] opacity-20 blur-xl group-hover:opacity-30 transition-opacity duration-500"
        ></div>
        <img
          :src="projectMeta.screenshots[0].url"
          class="relative w-full h-auto object-cover rounded-[1.5rem] shadow-2xl border border-slate-200 bg-white"
          alt="Project Screenshot"
        />
      </div>

      <div class="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
        <div class="lg:col-span-8 space-y-10">
          <div class="prose prose-slate max-w-none">
            <h3 class="text-2xl font-bold text-slate-800 mb-4 flex items-center gap-2">
              {{ $t('portfolio.detail.about') }}
            </h3>
            <p class="text-slate-600 leading-relaxed text-justify whitespace-pre-line text-lg">
              {{ $t(i18nKeys.description) }}
            </p>
          </div>

          <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div class="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm">
              <h4 class="font-bold text-slate-800 mb-4 flex items-center gap-2">
                {{ $t('portfolio.detail.features') }}
              </h4>
              <ul class="space-y-3">
                <li
                  v-for="(feat, i) in featuresList"
                  :key="i"
                  class="flex gap-3 text-sm text-slate-600"
                >
                  <span class="text-blue-500 font-bold">•</span>
                  {{ $rt(feat) }}
                </li>
              </ul>
            </div>

            <div class="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm">
              <h4 class="font-bold text-slate-800 mb-4 flex items-center gap-2">
                {{ $t('portfolio.detail.achievements') }}
              </h4>
              <ul class="space-y-3">
                <li
                  v-for="(ach, i) in achievementsList"
                  :key="i"
                  class="flex gap-3 text-sm text-slate-600"
                >
                  <span class="text-green-500 font-bold">✓</span>
                  {{ $rt(ach) }}
                </li>
              </ul>
            </div>
          </div>

          <div
            v-if="projectMeta.screenshots && projectMeta.screenshots.length > 1"
            class="space-y-6"
          >
            <h3 class="text-2xl font-bold text-slate-800">
              {{ $t('portfolio.detail.gallery') }}
            </h3>
            <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div
                v-for="(shot, idx) in projectMeta.screenshots.slice(1)"
                :key="idx"
                class="group relative rounded-2xl overflow-hidden border border-slate-200 shadow-sm hover:shadow-lg transition-all duration-300"
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
            <div
              class="bg-white rounded-3xl p-6 border border-slate-100 shadow-xl shadow-slate-200/50"
            >
              <h3 class="text-lg font-bold text-slate-800 mb-4">
                {{ $t('portfolio.detail.techUsed') }}
              </h3>
              <div class="flex flex-wrap gap-2">
                <div
                  v-for="(tech, index) in projectMeta.technologies || []"
                  :key="index"
                  class="flex items-center gap-2 px-3 py-2 bg-slate-50 border border-slate-100 rounded-lg"
                >
                  <span class="text-xs font-bold text-slate-700">{{ tech.name }}</span>
                </div>
              </div>
            </div>

            <div class="bg-slate-900 rounded-3xl p-6 text-white shadow-xl relative overflow-hidden">
              <div
                class="absolute top-0 right-0 -mt-4 -mr-4 w-24 h-24 bg-orange-500 rounded-full blur-2xl opacity-20"
              ></div>
              <h3 class="text-lg font-bold mb-4 relative z-10">
                {{ $t('portfolio.detail.projectInfo') }}
              </h3>
              <div class="space-y-4 relative z-10 text-sm">
                <div class="flex justify-between border-b border-slate-700 pb-2">
                  <span class="text-slate-400">{{ $t('portfolio.detail.type') }}</span>
                  <span class="font-medium">
                    {{ $t(projectTypeKey) }}
                  </span>
                </div>
                <div class="flex justify-between border-b border-slate-700 pb-2">
                  <span class="text-slate-400">{{ $t('portfolio.detail.role') }}</span>
                  <span class="font-medium">
                    {{ $t(i18nKeys.role) }}
                  </span>
                </div>
                <div class="flex justify-between border-b border-slate-700 pb-2">
                  <span class="text-slate-400">{{ $t('portfolio.detail.timeline') }}</span>
                  <span class="font-medium">
                    {{ $t(i18nKeys.duration) }}
                  </span>
                </div>
              </div>

              <a
                v-if="projectLink"
                :href="projectLink"
                target="_blank"
                class="mt-6 w-full flex items-center justify-center gap-2 px-4 py-3 bg-white text-slate-900 font-bold rounded-xl hover:bg-orange-500 hover:text-white transition-all"
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
      <p class="text-2xl font-bold text-slate-300">{{ $t('portfolio.detail.notFound') }}</p>
      <button class="text-orange-500 font-bold hover:underline" @click="goBack">
        {{ $t('portfolio.detail.return') }}
      </button>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useI18n } from 'vue-i18n'
import { usePortfolioProjects } from '~/composables/usePortfolioProjects'

const router = useRouter()
const route = useRoute()
const { tm } = useI18n()
const { findProjectById } = usePortfolioProjects()

type ProjectI18nKeys = {
  title: string
  role: string
  duration: string
  description: string
}

const projectId = computed(() => {
  const { id } = route.query
  if (Array.isArray(id)) return id[0] ?? ''
  return id ?? ''
})

const projectMeta = computed(() => findProjectById(projectId.value))
const projectLink = computed(() => projectMeta.value?.link ?? undefined)
const projectI18nBasePath = computed(() =>
  projectMeta.value ? `${projectMeta.value.i18nNamespace}.${projectMeta.value.id}` : ''
)

const i18nKeys = computed<ProjectI18nKeys>(() => {
  const basePath = projectI18nBasePath.value
  return {
    title: basePath ? `${basePath}.title` : '',
    role: basePath ? `${basePath}.role` : '',
    duration: basePath ? `${basePath}.duration` : '',
    description: basePath ? `${basePath}.description` : '',
  }
})

const projectTypeKey = computed(() => {
  return projectMeta.value?.projectType === 'company'
    ? 'portfolio.company'
    : 'portfolio.sideProject'
})

const toMessageArray = (messagePath: string) => {
  if (!messagePath) return []

  const messages = tm(messagePath) as unknown
  return Array.isArray(messages) ? messages : []
}

const featuresList = computed(() => {
  return toMessageArray(projectI18nBasePath.value ? `${projectI18nBasePath.value}.features` : '')
})

const achievementsList = computed(() => {
  return toMessageArray(
    projectI18nBasePath.value ? `${projectI18nBasePath.value}.achievements` : ''
  )
})

const goBack = () => {
  router.push('/portfolio')
}
</script>
