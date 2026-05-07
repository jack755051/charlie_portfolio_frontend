<template>
  <AboutSection
    id="section4"
    ref="aboutLeetcode"
    :title-main="$t('about.section4.titleMain')"
    :title-highlight="$t('about.section4.titleHighlight')"
    :subtitle="$t('about.section4.subtitle')"
  >
    <!-- Platform tab group -->
    <div class="flex items-center gap-2 mb-6">
      <button
        v-for="tab in platformTabs"
        :key="tab.key"
        class="px-4 py-1.5 rounded-full text-sm font-bold transition-all duration-200"
        :class="
          activePlatform === tab.key
            ? 'bg-foreground text-background shadow-md'
            : 'bg-muted text-muted-foreground hover:text-foreground'
        "
        @click="activePlatform = tab.key"
      >
        {{ tab.label }}
      </button>
    </div>

    <div v-if="loading" class="flex justify-center py-20">
      <div class="animate-spin rounded-full h-12 w-12 border-b-2 border-primary" />
    </div>

    <div v-else class="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
      <!-- Left: Recent activity -->
      <div class="lg:col-span-7 flex flex-col h-full">
        <div
          class="bg-card rounded-3xl p-6 md:p-8 shadow-xl shadow-foreground/5 border border-border h-full"
        >
          <CCardHeader :title="$t('about.section4.recentActivity')">
            <template #prefix>
              <span class="relative flex h-3 w-3">
                <span
                  class="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"
                />
                <span class="relative inline-flex rounded-full h-3 w-3 bg-green-500" />
              </span>
            </template>
            <template #action>
              <CSegmented
                v-model="activityFilter"
                :options="activityFilterOptions"
              />
            </template>
          </CCardHeader>

          <div class="space-y-3">
            <template v-if="filteredRecent.length > 0">
              <div
                v-for="(item, index) in filteredRecent"
                :key="index"
              >
                <!-- Card row -->
                <div
                  class="flex flex-col md:flex-row md:items-center justify-between p-4 rounded-2xl border transition-all duration-300 cursor-pointer select-none"
                  :class="
                    expandedSlug === item.titleSlug
                      ? 'bg-card border-primary/40 shadow-md'
                      : 'border-border bg-muted/30 hover:bg-card hover:border-primary/40 hover:shadow-md'
                  "
                  @click="toggleExpand(item.titleSlug)"
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
                        class="text-foreground font-bold transition-colors line-clamp-1"
                        :class="expandedSlug === item.titleSlug ? 'text-primary' : ''"
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
                    <!-- Expand indicator -->
                    <svg
                      class="w-4 h-4 text-muted-foreground transition-transform duration-300"
                      :class="expandedSlug === item.titleSlug ? 'rotate-180' : ''"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      stroke-width="2"
                    >
                      <path stroke-linecap="round" stroke-linejoin="round" d="M19 9l-7 7-7-7" />
                    </svg>
                  </div>
                </div>

                <!-- Expandable solution note -->
                <div
                  class="grid transition-all duration-300 ease-out"
                  :class="expandedSlug === item.titleSlug ? 'grid-rows-[1fr] opacity-100 mt-2' : 'grid-rows-[0fr] opacity-0'"
                >
                  <div class="overflow-hidden">
                    <div class="p-4 rounded-2xl bg-muted/40 border border-border/50 text-sm leading-relaxed">
                      <ContentRenderer
                        v-if="getSolution(item.titleSlug)"
                        :value="getSolution(item.titleSlug)"
                      />
                      <p v-else class="text-muted-foreground italic">
                        {{ $t('about.section4.noSolutionNote') }}
                      </p>
                    </div>
                  </div>
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

      <!-- Right: Progress + Chart -->
      <div class="lg:col-span-5 flex flex-col gap-6">
        <div
          class="bg-card/90 backdrop-blur-sm rounded-3xl p-8 shadow-xl shadow-primary/10 border border-border relative overflow-hidden group hover:shadow-2xl transition-all duration-500"
        >
          <div
            class="absolute -top-10 -right-10 w-40 h-40 bg-gradient-to-br from-primary/20 to-transparent rounded-full opacity-50 blur-2xl group-hover:opacity-100 transition-opacity duration-500"
          />
          <CCardHeader :title="$t('about.section4.progressOverview')">
            <template #prefix>
              <span class="w-2 h-2 rounded-full bg-foreground" />
            </template>
          </CCardHeader>
          <div class="flex items-end gap-3">
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
          <CCardHeader :title="chartTitle">
            <template #action>
              <CSegmented
                v-model="chartMode"
                :options="chartModeOptions"
              />
            </template>
          </CCardHeader>
          <div class="flex-1 w-full relative">
            <client-only>
              <v-chart class="w-full h-[250px]" :option="pieOption" autoresize />
            </client-only>
          </div>
        </div>
      </div>
    </div>
  </AboutSection>
</template>

<script lang="ts" setup>
import AboutSection from '~/components/layouts/AboutSection.vue'
import CSegmented from '~/components/base/segmented.vue'
import CCardHeader from '~/components/base/card-header.vue'
import { computed, ref, watch } from 'vue'
import { useI18n } from '#imports'
import { useLeetcodeProfile } from '~/composables/useLeetcodeProfile'
import { useSolutionNotes } from '~/composables/useSolutionNotes'
import VChart from 'vue-echarts'
import { use } from 'echarts/core'
import { CanvasRenderer } from 'echarts/renderers'
import { PieChart } from 'echarts/charts'
import { TooltipComponent, LegendComponent } from 'echarts/components'

use([CanvasRenderer, PieChart, TooltipComponent, LegendComponent])

const { t } = useI18n()
const { profile: stats, loading } = useLeetcodeProfile()
const { getSolution } = useSolutionNotes()
const displayTotal = ref(0)

// Platform tabs
const platformTabs = [
  { key: 'leetcode', label: 'LeetCode' },
]
const activePlatform = ref('leetcode')

// Activity filter
const activityFilter = ref('all')
const activityFilterOptions = computed(() => [
  { label: t('about.section4.filterAll'), value: 'all' },
  { label: t('about.section4.filterAccepted'), value: 'accepted' },
])
const filteredRecent = computed(() => {
  const list = stats.value?.recent || []
  if (activityFilter.value === 'accepted') {
    return list.filter((item: { isSuccess: boolean }) => item.isSuccess)
  }
  return list
})

// Expand solution note
const expandedSlug = ref<string | null>(null)
const toggleExpand = (slug: string) => {
  expandedSlug.value = expandedSlug.value === slug ? null : slug
}

// Chart mode
const chartMode = ref('difficulty')
const chartModeOptions = computed(() => [
  { label: t('about.section4.difficulty'), value: 'difficulty' },
  { label: t('about.section4.category'), value: 'category' },
])
const chartTitle = computed(() =>
  chartMode.value === 'difficulty'
    ? t('about.section4.difficultyBreakdown')
    : t('about.section4.categoryBreakdown')
)

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

const SKILL_COLORS = ['#60a5fa', '#f472b6', '#a78bfa', '#34d399', '#fbbf24', '#fb923c', '#94a3b8']

const pieOption = computed(() => {
  if (chartMode.value === 'difficulty') {
    return {
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
    }
  }

  const skills = stats.value?.skills || []
  const top = skills.slice(0, 6)
  const rest = skills.slice(6)
  const otherValue = rest.reduce((sum: number, s: { value: number }) => sum + s.value, 0)

  const data = top.map((s: { name: string; value: number }, i: number) => ({
    value: s.value,
    name: s.name,
    itemStyle: { color: SKILL_COLORS[i] },
  }))
  if (otherValue > 0) {
    data.push({ value: otherValue, name: 'Other', itemStyle: { color: SKILL_COLORS[6] } })
  }

  return {
    tooltip: { trigger: 'item', formatter: '{b}: {c} ({d}%)' },
    legend: { bottom: '0%', left: 'center', icon: 'circle' },
    series: [
      {
        name: 'Category',
        type: 'pie',
        radius: ['40%', '70%'],
        center: ['50%', '45%'],
        itemStyle: { borderRadius: 8, borderColor: '#fff', borderWidth: 2 },
        label: { show: false },
        data,
      },
    ],
  }
})
</script>
