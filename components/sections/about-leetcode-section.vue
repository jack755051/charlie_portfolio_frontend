<template>
    <ScrollSection ref="aboutLeetcode" id="section4" class="relative overflow-hidden">
        <div class="absolute top-1/2 right-0 w-96 h-96 bg-gray-100 rounded-full blur-3xl opacity-50 pointer-events-none -z-10"></div>
        <template #title>
            <div class="flex w-full items-center justify-center py-8 mb-10">
                <div class="relative pb-2">
                    <p class="text-4xl md:text-5xl font-bold text-slate-800">LeetCode挑戰</p>
                    <div class="absolute bottom-0 left-1/2 -translate-x-1/2 w-1/2 h-1 bg-gradient-to-r from-orange-500 to-amber-400 rounded-full"></div>
                </div>
            </div>
        </template>
        
        <template #content>
        <div class="w-full max-w-6xl mx-auto px-6 pb-20">
            <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
                <!-- LeetCode 統計卡片 -->
                <div class="bg-white rounded-2xl shadow-lg p-6 hover:shadow-xl transition-shadow duration-300">
                    <h3 class="text-2xl font-semibold text-gray-800 mb-4">解題統計</h3>
                    <div class="space-y-4">
                        <div class="flex justify-between items-center">
                            <span class="text-gray-600">總題數</span>
                            <span class="text-2xl font-bold text-green-600">150+</span>
                        </div>
                        <div class="flex justify-between items-center">
                            <span class="text-gray-600">簡單</span>
                            <span class="text-xl font-semibold text-green-500">80</span>
                        </div>
                        <div class="flex justify-between items-center">
                            <span class="text-gray-600">中等</span>
                            <span class="text-xl font-semibold text-yellow-500">60</span>
                        </div>
                        <div class="flex justify-between items-center">
                            <span class="text-gray-600">困難</span>
                            <span class="text-xl font-semibold text-red-500">10</span>
                        </div>
                    </div>
                </div>

                <!-- 技能標籤 -->
                <div class="bg-white rounded-2xl shadow-lg p-6 hover:shadow-xl transition-shadow duration-300">
                    <h3 class="text-2xl font-semibold text-gray-800 mb-4">擅長領域</h3>
                    <div class="flex flex-wrap gap-3">
                        <span class="px-4 py-2 bg-blue-100 text-blue-700 rounded-full text-sm font-medium">陣列</span>
                        <span class="px-4 py-2 bg-green-100 text-green-700 rounded-full text-sm font-medium">字串</span>
                        <span class="px-4 py-2 bg-purple-100 text-purple-700 rounded-full text-sm font-medium">動態規劃</span>
                        <span class="px-4 py-2 bg-orange-100 text-orange-700 rounded-full text-sm font-medium">貪心算法</span>
                        <span class="px-4 py-2 bg-pink-100 text-pink-700 rounded-full text-sm font-medium">二分搜索</span>
                        <span class="px-4 py-2 bg-indigo-100 text-indigo-700 rounded-full text-sm font-medium">樹</span>
                        <span class="px-4 py-2 bg-yellow-100 text-yellow-700 rounded-full text-sm font-medium">圖</span>
                    </div>
                </div>
            </div>

            <!-- 圖表區域 -->
            <div class="mt-8 bg-white rounded-2xl shadow-lg p-6">
                <h3 class="text-2xl font-semibold text-gray-800 mb-6">題目難度分布</h3>
                <client-only>
                    <v-chart class="chart" :option="chartOption" />
                </client-only>
            </div>
        </div>
        </template>
    </ScrollSection>
</template>

<script lang="ts" setup>
import VChart from 'vue-echarts';
import ScrollSection from "~/layouts/scrollSection.vue";
import { use } from 'echarts/core';
import { CanvasRenderer } from 'echarts/renderers';
import { PieChart } from 'echarts/charts';
import {
    TitleComponent,
    TooltipComponent,
    LegendComponent,
} from 'echarts/components';

use([
    CanvasRenderer,
    PieChart,
    TitleComponent,
    TooltipComponent,
    LegendComponent,
]);

const chartOption = ref({
    tooltip: {
        trigger: 'item',
        formatter: '{b}: {c} 題 ({d}%)'
    },
    legend: {
        orient: 'horizontal',
        bottom: '5%',
    },
    series: [
        {
            name: 'LeetCode',
            type: 'pie',
            radius: ['40%', '70%'],
            avoidLabelOverlap: false,
            itemStyle: {
                borderRadius: 10,
                borderColor: '#fff',
                borderWidth: 2
            },
            label: {
                show: false,
                position: 'center'
            },
            emphasis: {
                label: {
                    show: true,
                    fontSize: 20,
                    fontWeight: 'bold'
                }
            },
            labelLine: {
                show: false
            },
            data: [
                { value: 80, name: '簡單', itemStyle: { color: '#22c55e' } },
                { value: 60, name: '中等', itemStyle: { color: '#eab308' } },
                { value: 10, name: '困難', itemStyle: { color: '#ef4444' } }
            ]
        }
    ]
});
</script>

<style scoped>
.chart {
    height: 400px;
    width: 100%;
}
</style>