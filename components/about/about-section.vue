<template>
  <AboutSection
    ref="aboutSection"
    id="section1"
    :title-main="$t('about.section1.titleMain')"
    :title-highlight="$t('about.section1.titleHighlight')"
    :subtitle="$t('about.section1.subtitle')"
  >
    <div class="flex flex-col md:flex-row gap-12 items-start">
      <div class="flex-1 space-y-10">
        <div class="space-y-4">
          <h3 class="text-2xl font-bold text-slate-700 flex items-center gap-3">
            <span class="text-2xl">👋</span> {{ $t(aboutData.intro.titleKey) }}
          </h3>
          <p class="text-slate-600 leading-relaxed text-justify text-lg">
            {{ $t(aboutData.intro.contentKey) }}
          </p>
        </div>

        <div class="w-full h-px bg-slate-100"></div>

        <div class="space-y-4">
          <h4 class="text-lg font-bold text-slate-800 flex items-center gap-2">
            <span class="w-1.5 h-6 bg-orange-500 rounded-full"></span>
            {{ $t(aboutData.techStack.titleKey) }}
          </h4>
          <p class="text-slate-600 leading-relaxed text-justify">
            {{ $t(aboutData.techStack.contentKey) }}
          </p>
        </div>

        <div class="space-y-4">
          <h4 class="text-lg font-bold text-slate-800 flex items-center gap-2">
            <span class="w-1.5 h-6 bg-blue-500 rounded-full"></span>
            {{ $t(aboutData.experience.titleKey) }}
          </h4>
          <p class="text-slate-600 leading-relaxed text-justify mb-2">
            {{ $t('about.section1.experience.content') }}
          </p>
          <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div
              class="p-4 bg-white/60 backdrop-blur-sm border border-slate-200/60 rounded-2xl hover:bg-white hover:shadow-lg hover:shadow-orange-100/50 hover:border-orange-200 transition-all duration-300 group cursor-default"
            >
              <div class="flex items-center justify-between mb-2">
                <div class="text-xs text-orange-500 font-bold bg-orange-50 px-2 py-1 rounded-md">
                  {{ $t('about.section1.experience.internalTools') }}
                </div>
                <div
                  class="w-2 h-2 rounded-full bg-orange-400 opacity-0 group-hover:opacity-100 transition-opacity"
                ></div>
              </div>
              <div
                class="font-bold text-slate-800 text-lg group-hover:text-orange-600 transition-colors"
              >
                {{ $t('about.section1.experience.systalkAdminHub') }}
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="w-full md:w-1/3 flex flex-col gap-6 sticky top-24">
        <div
          class="bg-white/80 backdrop-blur-md border border-white/50 p-6 rounded-3xl shadow-xl shadow-slate-200/50"
        >
          <h4 class="font-bold text-slate-800 mb-3 flex items-center gap-2">
            <span class="animate-bounce">🚀</span> {{ $t(aboutData.passion.titleKey) }}
          </h4>
          <p class="text-sm text-slate-600 leading-relaxed mb-4">
            {{ $t(aboutData.passion.contentKey) }}
          </p>
          <div class="flex flex-wrap gap-2">
            <span
              v-for="(tag, index) in $t(aboutData.tagsKey)"
              :key="index"
              class="px-3 py-1 bg-slate-50 text-slate-600 text-xs font-medium rounded-full border border-slate-200/60"
            >
              # {{ tag }}
            </span>
          </div>
        </div>

        <div class="grid grid-cols-2 gap-4">
          <button
            @click="handlerOpenOtherWindow(ExternalLinks.GITHUB)"
            class="flex flex-col items-center justify-center gap-2 p-4 bg-slate-900 text-white rounded-2xl hover:bg-slate-800 hover:-translate-y-1 transition-all duration-300 shadow-lg group"
          >
            <GithubIcon class="w-8 h-8 fill-current group-hover:scale-110 transition-transform" />
            <span class="text-sm font-bold">Github</span>
          </button>
          <button
            @click="handlerOpenOtherWindow(ExternalLinks.NPM)"
            class="flex flex-col items-center justify-center gap-2 p-4 bg-[#CB3837] text-white rounded-2xl hover:bg-[#a82e2d] hover:-translate-y-1 transition-all duration-300 shadow-lg shadow-red-500/30 group"
          >
            <NpmIcon class="w-12 h-8 fill-current group-hover:scale-110 transition-transform" />
            <span class="text-sm font-bold">NPM</span>
          </button>
        </div>

        <div
          class="relative py-6 px-6 bg-orange-50/50 rounded-3xl border border-orange-100/50 text-center"
        >
          <div class="text-4xl text-orange-200 absolute top-2 left-4 font-serif">"</div>
          <p class="text-sm text-slate-600 italic font-medium relative z-10">
            {{ $t('about.section1.quote') }}
          </p>
          <div class="text-4xl text-orange-200 absolute bottom-[-10px] right-4 font-serif">"</div>
        </div>
      </div>
    </div>
  </AboutSection>
</template>

<script setup lang="ts">
import AboutSection from '~/components/layouts/AboutSection.vue'
import { ExternalLinks } from '~/api/url'
import GithubIcon from 'assets/images/git-icon.svg'
import NpmIcon from 'assets/images/npm-icon.svg'
import { openExternalLink } from '~/utils/navigation'
import { useAbout } from '~/composables/useAbout'

const aboutData = useAbout()
const handlerOpenOtherWindow = openExternalLink
</script>
