<template>
  <ScrollSection ref="aboutLeetcode" id="section4" class="relative overflow-hidden py-24">
    <div
      class="absolute top-20 -left-20 w-96 h-96 bg-orange-200/40 rounded-full blur-[100px] pointer-events-none"
    ></div>
    <div
      class="absolute bottom-0 -right-20 w-[500px] h-[500px] bg-blue-100/40 rounded-full blur-[100px] pointer-events-none -z-10"
    ></div>

    <template #title>
      <div class="flex w-full items-center justify-center mb-16 relative z-10">
        <div class="relative pb-2 text-center group cursor-default">
          <h2
            class="text-4xl md:text-5xl font-bold text-slate-800 tracking-tight transition-transform duration-500 hover:scale-105"
          >
            Algorithm
            <span
              class="text-transparent bg-clip-text bg-gradient-to-r from-orange-500 to-amber-500 animate-gradient-x"
            >
              Journey
            </span>
          </h2>
          <div
            class="absolute bottom-0 left-1/2 -translate-x-1/2 w-16 h-1.5 bg-gradient-to-r from-orange-500 to-amber-400 rounded-full transition-all duration-300 group-hover:w-32"
          ></div>
          <p class="mt-4 text-slate-500 text-sm md:text-base font-medium">
            持續鍛鍊邏輯思維，保持代碼手感
          </p>
        </div>
      </div>
    </template>

    <template #content>
      <div class="w-full max-w-7xl mx-auto px-6 relative z-10">
        <div v-if="leetcodeStore.loading" class="flex justify-center py-20">
          <div class="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-500"></div>
        </div>

        <div v-else class="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          <div class="lg:col-span-5 flex flex-col gap-6">
            <div
              class="bg-white/90 backdrop-blur-sm rounded-3xl p-8 shadow-xl shadow-orange-100/50 border border-white relative overflow-hidden group hover:shadow-2xl transition-all duration-500"
            >
              <div
                class="absolute -top-10 -right-10 w-40 h-40 bg-gradient-to-br from-orange-100 to-transparent rounded-full opacity-50 blur-2xl group-hover:opacity-100 transition-opacity duration-500"
              ></div>

              <h3 class="text-lg font-bold text-slate-500 mb-2 uppercase tracking-wider">
                Total Solved
              </h3>
              <div class="flex items-baseline gap-2 relative">
                <span
                  class="text-7xl font-black text-transparent bg-clip-text bg-gradient-to-r from-slate-800 to-slate-600 drop-shadow-sm"
                >
                  {{ displayTotal }}
                </span>
                <span class="text-slate-400 font-medium text-lg">Questions</span>
              </div>

              <p
                class="mt-6 text-slate-600 leading-relaxed text-justify text-sm border-t border-slate-100 pt-4"
              >
                <span class="text-orange-500 font-bold">"</span>
                不只是刷題，更在於優化複雜度。習慣將思路整理成筆記，並嘗試用不同解法剖析同一問題。
                <span class="text-orange-500 font-bold">"</span>
              </p>
            </div>

            <div
              class="bg-white/80 backdrop-blur-md rounded-3xl p-8 shadow-lg shadow-slate-200/50 border border-white flex-1 flex flex-col justify-center"
            >
              <div class="space-y-6">
                <div class="group/bar">
                  <div class="flex justify-between text-sm font-bold mb-2">
                    <span class="text-slate-500 group-hover/bar:text-green-600 transition-colors"
                      >Easy</span
                    >
                    <span class="text-slate-700">{{ stats?.easy || 0 }} 題</span>
                  </div>
                  <div class="w-full h-3 bg-slate-100 rounded-full overflow-hidden shadow-inner">
                    <div
                      class="h-full bg-gradient-to-r from-green-400 to-green-500 rounded-full transition-all duration-1000 ease-out relative"
                      :style="{ width: `${stats?.easyPct || 0}%` }"
                    >
                      <div class="absolute inset-0 bg-white/30 animate-[shimmer_2s_infinite]"></div>
                    </div>
                  </div>
                </div>

                <div class="group/bar">
                  <div class="flex justify-between text-sm font-bold mb-2">
                    <span class="text-slate-500 group-hover/bar:text-amber-500 transition-colors"
                      >Medium</span
                    >
                    <span class="text-slate-700">{{ stats?.medium || 0 }} 題</span>
                  </div>
                  <div class="w-full h-3 bg-slate-100 rounded-full overflow-hidden shadow-inner">
                    <div
                      class="h-full bg-gradient-to-r from-amber-400 to-amber-500 rounded-full transition-all duration-1000 ease-out relative delay-100"
                      :style="{ width: `${stats?.mediumPct || 0}%` }"
                    ></div>
                  </div>
                </div>

                <div class="group/bar">
                  <div class="flex justify-between text-sm font-bold mb-2">
                    <span class="text-slate-500 group-hover/bar:text-red-500 transition-colors"
                      >Hard</span
                    >
                    <span class="text-slate-700">{{ stats?.hard || 0 }} 題</span>
                  </div>
                  <div class="w-full h-3 bg-slate-100 rounded-full overflow-hidden shadow-inner">
                    <div
                      class="h-full bg-gradient-to-r from-red-400 to-red-500 rounded-full transition-all duration-1000 ease-out relative delay-200"
                      :style="{ width: `${stats?.hardPct || 0}%` }"
                    ></div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div class="lg:col-span-7 flex flex-col gap-6">
            <div
              class="bg-white rounded-3xl p-6 shadow-xl shadow-slate-200/40 border border-slate-50 flex items-center justify-center relative min-h-[400px]"
            >
              <div
                class="absolute inset-0 bg-[radial-gradient(#f1f5f9_1px,transparent_1px)] [background-size:16px_16px] opacity-50 rounded-3xl"
              ></div>

              <div class="w-full h-[350px] relative z-10">
                <client-only>
                  <v-chart class="w-full h-full" :option="chartOption" autoresize />
                </client-only>
              </div>
            </div>

            <div class="bg-slate-50/80 backdrop-blur rounded-3xl p-6 border border-slate-200/50">
              <h4
                class="text-xs font-bold text-slate-400 uppercase tracking-widest mb-4 flex items-center gap-2"
              >
                <span class="w-2 h-2 rounded-full bg-orange-400 animate-pulse"></span>
                Key Topics
              </h4>
              <div class="flex flex-wrap gap-2.5">
                <span
                  v-for="tag in tags"
                  :key="tag"
                  class="px-4 py-2 bg-white text-slate-600 text-sm font-semibold rounded-xl border border-slate-200 shadow-sm hover:border-orange-300 hover:text-orange-600 hover:shadow-md hover:-translate-y-0.5 transition-all duration-300 cursor-default"
                >
                  # {{ tag }}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </template>
  </ScrollSection>
</template>

<script lang="ts" setup>
import ScrollSection from '~/layouts/scrollSection.vue'
import { useLeetcodeStore } from '~/stores/useLeetcodeStore'
import VChart from 'vue-echarts'
import { use } from 'echarts/core'
import { CanvasRenderer } from 'echarts/renderers'
import { PieChart } from 'echarts/charts'
import { TooltipComponent, LegendComponent } from 'echarts/components'

use([CanvasRenderer, PieChart, TooltipComponent, LegendComponent])

const leetcodeStore = useLeetcodeStore()

// 1. 取得清洗後的資料
const stats = computed(() => leetcodeStore.userStats)

// 2. 數字動畫效果 (Count Up Effect)
const displayTotal = ref(0)

watch(
  stats,
  newStats => {
    if (newStats && newStats.total > 0) {
      // 簡單的數字遞增動畫
      let start = 0
      const end = newStats.total
      const duration = 1500
      const stepTime = Math.abs(Math.floor(duration / end))

      const timer = setInterval(
        () => {
          start += 1
          displayTotal.value = start
          if (start >= end) {
            displayTotal.value = end // 確保最終數字正確
            clearInterval(timer)
          }
        },
        Math.max(stepTime, 10)
      ) // 至少 10ms 更新一次
    }
  },
  { immediate: true }
)

// 3. 圖表設定：改成 Computed 才能響應資料變化
const chartOption = computed(() => ({
  tooltip: {
    trigger: 'item',
    formatter: (params: any) => {
      return `<div class="font-bold text-slate-700 mb-1">${params.name}</div>
              <div class="flex items-center gap-2">
                <span class="w-2 h-2 rounded-full" style="background-color:${params.color}"></span>
                <span class="text-sm text-slate-500 font-mono">${params.value} (${params.percent}%)</span>
              </div>`
    },
    backgroundColor: 'rgba(255, 255, 255, 0.95)',
    borderColor: '#e2e8f0',
    borderWidth: 1,
    padding: [12, 16],
    textStyle: { color: '#334155' },
    extraCssText: 'box-shadow: 0 4px 6px -1px rgb(0 0 0 / 0.1); border-radius: 8px;',
  },
  legend: {
    orient: 'vertical',
    right: '5%',
    top: 'center',
    itemGap: 24,
    textStyle: {
      color: '#64748b',
      fontSize: 14,
      fontWeight: 600,
      padding: [0, 0, 0, 8],
    },
    icon: 'circle',
    formatter: (name: string) => {
      // 在 Legend 上直接顯示數值
      let targetVal = 0
      if (name === 'Easy') targetVal = stats.value?.easy || 0
      else if (name === 'Medium') targetVal = stats.value?.medium || 0
      else if (name === 'Hard') targetVal = stats.value?.hard || 0
      return `${name}   |   ${targetVal}`
    },
  },
  series: [
    {
      name: 'Difficulty',
      type: 'pie',
      radius: ['55%', '75%'], // 調整甜甜圈粗細
      center: ['35%', '50%'],
      avoidLabelOverlap: false,
      itemStyle: {
        borderRadius: 10,
        borderColor: '#ffffff',
        borderWidth: 5, // 增加間隙感
      },
      label: { show: false },
      emphasis: {
        scale: true,
        scaleSize: 8,
        itemStyle: {
          shadowBlur: 20,
          shadowColor: 'rgba(0, 0, 0, 0.15)',
        },
        label: {
          show: true,
          position: 'center',
          formatter: '{c}',
          fontSize: 32,
          fontWeight: 'bold',
          color: '#334155',
        },
      },
      // 這裡綁定 Store 的資料
      data: [
        { value: stats.value?.easy || 0, name: 'Easy', itemStyle: { color: '#4ade80' } },
        { value: stats.value?.medium || 0, name: 'Medium', itemStyle: { color: '#fbbf24' } },
        { value: stats.value?.hard || 0, name: 'Hard', itemStyle: { color: '#f87171' } },
      ],
    },
  ],
}))

const tags = [
  'Array',
  'String',
  'Hash Table',
  'Dynamic Programming',
  'Two Pointers',
  'Binary Search',
  'Tree',
  'DFS/BFS',
  'Greedy',
]

onMounted(() => {
  leetcodeStore.fetchLeetcodeData('jack755051')
})
</script>

<style scoped>
/* 如果有需要額外定義動畫 */
@keyframes shimmer {
  0% {
    transform: translateX(-100%);
  }
  100% {
    transform: translateX(100%);
  }
}
</style>
