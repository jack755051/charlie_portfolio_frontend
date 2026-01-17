<template>
  <ScrollSection ref="technologyStackSection" id="section3" class="relative">
    <div
      class="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-slate-100/50 via-transparent to-transparent pointer-events-none -z-10"
    ></div>

    <template #title>
      <div class="flex w-full py-8 items-center justify-center mb-10">
        <div class="relative pb-2">
          <p class="text-4xl md:text-5xl font-bold text-slate-800">Tech Stack</p>
          <div
            class="absolute bottom-0 left-1/2 -translate-x-1/2 w-1/2 h-1 bg-gradient-to-r from-orange-500 to-amber-400 rounded-full"
          ></div>
        </div>
      </div>
    </template>

    <template #content>
      <div class="w-full max-w-7xl mx-auto px-6 pb-20">
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
          <CTechCard
            v-for="(category, index) in techStore.techStack.value"
            :key="index"
            :title="category.title"
            :description="category.description"
            :stack="category.items"
            :class="category.class"
          />

          <div
            class="col-span-1 md:col-span-2 lg:col-span-2 bg-slate-900 rounded-2xl p-6 flex flex-col md:flex-row items-center justify-between shadow-xl text-white relative overflow-hidden group"
          >
            <div
              class="absolute inset-0 bg-gradient-to-r from-orange-500 to-amber-500 opacity-0 group-hover:opacity-20 transition-opacity duration-500 pointer-events-none"
            ></div>

            <div
              class="absolute -right-10 -top-10 w-40 h-40 bg-white opacity-5 rounded-full blur-3xl pointer-events-none"
            ></div>

            <div class="z-10 mb-6 md:mb-0 text-center md:text-left relative">
              <h3
                class="text-2xl font-bold mb-2 flex items-center justify-center md:justify-start gap-2"
              >
                持續進化中 🚀
              </h3>
              <p class="text-slate-400 text-sm leading-relaxed">
                技術是解決問題的工具，而學習是工程師的本能。<br class="hidden md:block" />
                目前正在深入研究 <span class="text-orange-400 font-bold">WebGL</span> 與
                <span class="text-orange-400 font-bold">系統架構設計</span>。
              </p>
            </div>

            <button
              class="z-10 px-6 py-3 bg-white text-slate-900 font-bold rounded-full hover:bg-orange-50 hover:text-orange-600 transition-all shadow-lg flex items-center gap-2 active:scale-95"
              @click="handlerDownloadResume"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="h-5 w-5"
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
              <span>下載完整履歷</span>
            </button>
          </div>
        </div>
      </div>
    </template>
  </ScrollSection>
</template>

<script setup lang="ts">
import { useTechStack } from '~/composables/useTechStack'
import CTechCard from '~/components/base/tech-card.vue'
import ScrollSection from '~/layouts/scrollSection.vue'

const techStore = useTechStack()
</script>
