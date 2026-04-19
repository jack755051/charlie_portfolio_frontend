<template>
  <AboutSection
    id="section4"
    ref="aboutLeetcode"
    :title-main="$t('about.section4.titleMain')"
    :title-highlight="$t('about.section4.titleHighlight')"
    :subtitle="$t('about.section4.subtitle')"
  >
    <div v-if="loading" class="flex justify-center py-20">
      <div class="animate-spin rounded-full h-12 w-12 border-b-2 border-primary" />
    </div>

    <div v-else class="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
      <div class="lg:col-span-5 flex flex-col gap-6">
        <div
          class="bg-card/90 backdrop-blur-sm rounded-3xl p-8 shadow-xl shadow-primary/10 border border-border relative overflow-hidden group hover:shadow-2xl transition-all duration-500"
        >
          <div
            class="absolute -top-10 -right-10 w-40 h-40 bg-gradient-to-br from-primary/20 to-transparent rounded-full opacity-50 blur-2xl group-hover:opacity-100 transition-opacity duration-500"
          />
          <h3
            class="text-sm font-bold text-muted-foreground mb-2 uppercase tracking-wider flex items-center gap-2"
          >
            <span class="w-2 h-2 rounded-full bg-foreground" />
            {{ $t('about.section4.progressOverview') }}
          </h3>
          <div class="flex items-end gap-3 mt-4">
            <span class="text-7xl font-black text-foreground leading-none">{{ displayTotal }}</span>
            <div class="flex flex-col mb-2">
              <span class="text-muted-foreground font-bold text-2xl"
                >/ {{ stats?.totalQuestions }}</span
              >
              <span class="text-muted-foreground text-xs uppercase tracking-wide">{{
                $t('about.section4.solvedTotal')
              }}</span>
            </div>
          </div>
          <div class="w-full h-1.5 bg-muted rounded-full mt-6 overflow-hidden">
            <div
              class="h-full bg-gradient-to-r from-foreground/70 to-foreground"
              :style="{ width: `${(stats?.totalSolved / stats?.totalQuestions) * 100}%` }"
            />
          </div>
        </div>

        <div
          class="bg-card rounded-3xl p-6 shadow-lg shadow-foreground/5 border border-border relative min-h-[320px] flex flex-col"
        >
          <h4 class="text-foreground font-bold text-lg mb-4 text-center">
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
          class="bg-card rounded-3xl p-6 md:p-8 shadow-xl shadow-foreground/5 border border-border h-full"
        >
          <div class="flex justify-between items-center mb-6">
            <h3 class="text-lg font-bold text-foreground flex items-center gap-2">
              <span class="relative flex h-3 w-3">
                <span
                  class="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"
                />
                <span class="relative inline-flex rounded-full h-3 w-3 bg-green-500" />
              </span>
              {{ $t('about.section4.recentActivity') }}
            </h3>
            <div class="text-xs font-medium text-muted-foreground bg-muted px-3 py-1 rounded-full">
              {{ $t('about.section4.latestSubmissions') }}
            </div>
          </div>

          <div class="space-y-3">
            <template v-if="stats?.recent && stats.recent.length > 0">
              <div
                v-for="(item, index) in stats.recent"
                :key="index"
                class="flex flex-col md:flex-row md:items-center justify-between p-4 rounded-2xl border border-border bg-muted/30 hover:bg-card hover:border-primary/40 hover:shadow-md transition-all duration-300 group cursor-default"
              >
                <div class="flex items-center gap-4 mb-2 md:mb-0">
                  <div
                    class="w-2.5 h-2.5 rounded-full shadow-sm"
                    :class="
                      item.isSuccess ? 'bg-green-500 shadow-green-200' : 'bg-red-400 shadow-red-200'
                    "
                  />
                  <div class="flex flex-col">
                    <span
                      class="text-foreground font-bold group-hover:text-primary transition-colors line-clamp-1"
                      >{{ item.title }}</span
                    >
                    <span class="text-xs text-muted-foreground font-mono">{{ item.lang }}</span>
                  </div>
                </div>
                <div class="flex items-center justify-between md:justify-end gap-6 pl-6 md:pl-0">
                  <span
                    class="text-xs font-bold px-2.5 py-1 rounded-lg border"
                    :class="
                      item.isSuccess
                        ? 'bg-green-500/10 text-green-600 border-green-500/20'
                        : 'bg-red-500/10 text-red-600 border-red-500/20'
                    "
                    >{{ item.status }}</span
                  >
                  <span class="text-xs text-muted-foreground font-mono min-w-[40px] text-right">{{
                    item.time
                  }}</span>
                </div>
              </div>
            </template>
            <div
              v-else
              class="flex flex-col items-center justify-center py-10 text-muted-foreground"
            >
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
import { computed, ref, watch } from 'vue'
import { useLeetcodeProfile } from '~/composables/useLeetcodeProfile'
import VChart from 'vue-echarts'
import { use } from 'echarts/core'
import { CanvasRenderer } from 'echarts/renderers'
import { PieChart } from 'echarts/charts'
import { TooltipComponent, LegendComponent } from 'echarts/components'

use([CanvasRenderer, PieChart, TooltipComponent, LegendComponent])

const { profile: stats, loading } = useLeetcodeProfile()
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
</script>
