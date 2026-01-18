<template>
  <AboutSection
    ref="aboutLeetcode"
    id="section4"
    :title-main="$t('about.section4.titleMain')"
    :title-highlight="$t('about.section4.titleHighlight')"
    :subtitle="$t('about.section4.subtitle')"
  >
    <div v-if="leetcodeStore.loading" class="flex justify-center py-20">
      <div class="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-500"></div>
    </div>

    <div v-else class="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
      <div class="lg:col-span-5 flex flex-col gap-6">
        <div
          class="bg-white/90 backdrop-blur-sm rounded-3xl p-8 shadow-xl shadow-orange-100/50 border border-white relative overflow-hidden group hover:shadow-2xl transition-all duration-500"
        >
          <div
            class="absolute -top-10 -right-10 w-40 h-40 bg-gradient-to-br from-orange-100 to-transparent rounded-full opacity-50 blur-2xl group-hover:opacity-100 transition-opacity duration-500"
          ></div>
          <h3
            class="text-sm font-bold text-slate-500 mb-2 uppercase tracking-wider flex items-center gap-2"
          >
            <span class="w-2 h-2 rounded-full bg-slate-800"></span>
            {{ $t('about.section4.progressOverview') }}
          </h3>
          <div class="flex items-end gap-3 mt-4">
            <span class="text-7xl font-black text-slate-800 leading-none">{{ displayTotal }}</span>
            <div class="flex flex-col mb-2">
              <span class="text-slate-400 font-bold text-2xl">/ {{ stats?.totalQuestions }}</span>
              <span class="text-slate-400 text-xs uppercase tracking-wide">{{
                $t('about.section4.solvedTotal')
              }}</span>
            </div>
          </div>
          <div class="w-full h-1.5 bg-slate-100 rounded-full mt-6 overflow-hidden">
            <div
              class="h-full bg-gradient-to-r from-slate-700 to-slate-900"
              :style="{ width: `${(stats?.totalSolved / stats?.totalQuestions) * 100}%` }"
            ></div>
          </div>
        </div>

        <div
          class="bg-white rounded-3xl p-6 shadow-lg shadow-slate-200/50 border border-slate-50 relative min-h-[320px] flex flex-col"
        >
          <h4 class="text-slate-800 font-bold text-lg mb-4 text-center">
            {{ $t('about.section4.difficultyBreakdown') }}
          </h4>
          <div class="flex-1 w-full relative">
            <client-only>
              <v-chart class="w-full h-[250px]" :option="pieOption" autoresize />
            </client-only>
          </div>
        </div>
      </div>

      <div class="lg:col-span-7 flex flex-col h-full">
        <div
          class="bg-white rounded-3xl p-6 md:p-8 shadow-xl shadow-slate-200/40 border border-slate-50 h-full"
        >
          <div class="flex justify-between items-center mb-6">
            <h3 class="text-lg font-bold text-slate-700 flex items-center gap-2">
              <span class="relative flex h-3 w-3">
                <span
                  class="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"
                ></span>
                <span class="relative inline-flex rounded-full h-3 w-3 bg-green-500"></span>
              </span>
              {{ $t('about.section4.recentActivity') }}
            </h3>
            <div class="text-xs font-medium text-slate-400 bg-slate-100 px-3 py-1 rounded-full">
              {{ $t('about.section4.latestSubmissions') }}
            </div>
          </div>

          <div class="space-y-3">
            <template v-if="stats?.recent && stats.recent.length > 0">
              <div
                v-for="(item, index) in stats.recent"
                :key="index"
                class="flex flex-col md:flex-row md:items-center justify-between p-4 rounded-2xl border border-slate-100 bg-slate-50/30 hover:bg-white hover:border-orange-200 hover:shadow-md transition-all duration-300 group cursor-default"
              >
                <div class="flex items-center gap-4 mb-2 md:mb-0">
                  <div
                    class="w-2.5 h-2.5 rounded-full shadow-sm"
                    :class="
                      item.isSuccess ? 'bg-green-500 shadow-green-200' : 'bg-red-400 shadow-red-200'
                    "
                  ></div>
                  <div class="flex flex-col">
                    <span
                      class="text-slate-700 font-bold group-hover:text-orange-600 transition-colors line-clamp-1"
                      >{{ item.title }}</span
                    >
                    <span class="text-xs text-slate-400 font-mono">{{ item.lang }}</span>
                  </div>
                </div>
                <div class="flex items-center justify-between md:justify-end gap-6 pl-6 md:pl-0">
                  <span
                    class="text-xs font-bold px-2.5 py-1 rounded-lg border"
                    :class="
                      item.isSuccess
                        ? 'bg-green-50 text-green-700 border-green-100'
                        : 'bg-red-50 text-red-700 border-red-100'
                    "
                    >{{ item.status }}</span
                  >
                  <span class="text-xs text-slate-400 font-mono min-w-[40px] text-right">{{
                    item.time
                  }}</span>
                </div>
              </div>
            </template>
            <div v-else class="flex flex-col items-center justify-center py-10 text-slate-400">
              <p>{{ $t('about.section4.noSubmissions') }}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </AboutSection>
</template>

<script lang="ts" setup>
import AboutSection from '~/components/layouts/AboutSection.vue'
import { computed, onMounted, ref, watch } from 'vue'
import { useLeetcodeStore } from '~/stores/useLeetcodeStore'
import VChart from 'vue-echarts'
import { use } from 'echarts/core'
import { CanvasRenderer } from 'echarts/renderers'
import { PieChart } from 'echarts/charts'
import { TooltipComponent, LegendComponent } from 'echarts/components'

use([CanvasRenderer, PieChart, TooltipComponent, LegendComponent])

const leetcodeStore = useLeetcodeStore()
const stats = computed(() => leetcodeStore.userStats)
const displayTotal = ref(0)

watch(
  stats,
  newStats => {
    if (newStats && newStats.totalSolved > 0) {
      let start = 0
      const end = newStats.totalSolved
      const duration = 1500
      const stepTime = Math.abs(Math.floor(duration / end))
      const timer = setInterval(
        () => {
          start += 1
          displayTotal.value = start
          if (start >= end) {
            displayTotal.value = end
            clearInterval(timer)
          }
        },
        Math.max(stepTime, 20)
      )
    }
  },
  { immediate: true }
)

const pieOption = computed(() => ({
  tooltip: { trigger: 'item', formatter: '{b}: {c} ({d}%)' },
  legend: { bottom: '0%', left: 'center', icon: 'circle' },
  series: [
    {
      name: 'Difficulty',
      type: 'pie',
      radius: ['40%', '70%'],
      center: ['50%', '45%'],
      itemStyle: { borderRadius: 8, borderColor: '#fff', borderWidth: 2 },
      label: { show: false },
      data: [
        { value: stats.value?.easy || 0, name: 'Easy', itemStyle: { color: '#4ade80' } },
        { value: stats.value?.medium || 0, name: 'Medium', itemStyle: { color: '#fbbf24' } },
        { value: stats.value?.hard || 0, name: 'Hard', itemStyle: { color: '#f87171' } },
      ],
    },
  ],
}))

onMounted(() => {
  leetcodeStore.fetchLeetcodeData('jack755051')
})
</script>
