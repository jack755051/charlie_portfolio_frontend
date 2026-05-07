<template>
  <AboutSection
    id="section1"
    ref="aboutSection"
    :title-main="$t('about.section1.titleMain')"
    :title-highlight="$t('about.section1.titleHighlight')"
    :subtitle="$t('about.section1.subtitle')"
  >
    <div class="flex flex-col md:flex-row gap-12 items-start">
      <div class="flex-1 space-y-10">
        <div class="space-y-4">
          <h3 class="text-2xl font-bold text-foreground flex items-center gap-3">
            <span class="text-2xl">👋</span> {{ $t('about.section1.intro.title') }}
          </h3>
          <p class="text-muted-foreground leading-relaxed text-justify text-lg">
            {{ $t('about.section1.intro.content') }}
          </p>
        </div>

        <div class="w-full h-px bg-border" />

        <div class="space-y-4">
          <h4 class="text-lg font-bold text-foreground flex items-center gap-2">
            <span class="w-1.5 h-6 bg-primary rounded-full"></span>
            {{ $t('about.section1.techStack.title') }}
          </h4>
          <p class="text-muted-foreground leading-relaxed text-justify">
            {{ $t('about.section1.techStack.content') }}
          </p>
        </div>

        <div class="space-y-4">
          <h4 class="text-lg font-bold text-foreground flex items-center gap-2">
            <span class="w-1.5 h-6 bg-sky-500 rounded-full"></span>
            {{ $t('about.section1.experience.title') }}
          </h4>
          <p class="text-muted-foreground leading-relaxed text-justify mb-2">
            {{ $t('about.section1.experience.content') }}
          </p>

          <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div
              v-motion="motion.subtleCard"
              class="p-4 bg-card/60 backdrop-blur-sm border border-border rounded-2xl hover:bg-card hover:shadow-lg hover:shadow-primary/10 hover:border-primary/40 transition-all duration-300 group cursor-default"
            >
              <div class="flex items-center justify-between mb-2">
                <div class="text-xs text-primary font-bold bg-accent/60 px-2 py-1 rounded-md">
                  {{ $t('about.section1.experience.highlight1') }}
                </div>
                <div
                  class="w-2 h-2 rounded-full bg-primary opacity-0 group-hover:opacity-100 transition-opacity"
                />
              </div>
              <div
                class="font-bold text-foreground text-lg group-hover:text-primary transition-colors"
              >
                {{ $t('about.section1.experience.highlight2') }}
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="w-full md:w-1/3 flex flex-col gap-6 sticky top-24">
        <div
          v-motion="motion.subtleCard"
          class="bg-card/80 backdrop-blur-md border border-border p-6 rounded-3xl shadow-xl shadow-foreground/5"
        >
          <h4 class="font-bold text-foreground mb-4 flex items-center gap-2">
            <span class="animate-bounce">🚀</span> {{ $t('about.section1.passion.title') }}
          </h4>
          <p class="text-sm text-muted-foreground leading-relaxed mb-6">
            {{ $t('about.section1.passion.content') }}
          </p>

          <div class="flex flex-wrap gap-3">
            <span
              v-for="(tag, index) in $tm('about.section1.tags')"
              :key="index"
              class="px-4 py-1.5 bg-card text-muted-foreground text-xs font-bold rounded-full border border-border shadow-sm hover:border-primary/50 hover:text-primary hover:shadow-md transition-all duration-300 cursor-default flex items-center gap-1"
            >
              <span class="text-muted-foreground/70 font-normal">#</span>
              {{ $rt(tag) }}
            </span>
          </div>
        </div>

        <div class="grid grid-cols-2 gap-4">
          <button
            v-motion="motion.action"
            class="flex flex-col items-center justify-center gap-2 p-4 bg-foreground text-background rounded-2xl hover:opacity-90 transition-all duration-300 shadow-lg group"
            @click="handlerOpenOtherWindow(ExternalLinks.GITHUB)"
          >
            <GithubIcon class="w-8 h-8 fill-current group-hover:scale-110 transition-transform" />
            <span class="text-sm font-bold">Github</span>
          </button>
          <button
            v-motion="motion.action"
            class="flex flex-col items-center justify-center gap-2 p-4 bg-[#CB3837] text-white rounded-2xl hover:bg-[#a82e2d] transition-all duration-300 shadow-lg shadow-red-500/30 group"
            @click="handlerOpenOtherWindow(ExternalLinks.NPM)"
          >
            <NpmIcon class="w-12 h-8 fill-current group-hover:scale-110 transition-transform" />
            <span class="text-sm font-bold">NPM</span>
          </button>
        </div>

        <div
          v-motion="motion.subtleCard"
          class="relative py-6 px-6 bg-accent/40 rounded-3xl border border-primary/20 text-center"
        >
          <div class="text-4xl text-primary/30 absolute top-2 left-4 font-serif">"</div>
          <p class="text-sm text-muted-foreground italic font-medium relative z-10">
            {{ $t('about.section1.quote') }}
          </p>
          <div class="text-4xl text-primary/30 absolute bottom-[-10px] right-4 font-serif">"</div>
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

const handlerOpenOtherWindow = openExternalLink
const motion = useMotionPresets()
</script>
