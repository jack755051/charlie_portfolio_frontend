<template>
    <div class="min-h-screen bg-gray-50 p-0 overflow-y-auto">
        <!-- 返回按鈕 -->
        <div class="fixed top-20 left-8 z-[100]">
            <button
                @click="goBack"
                class="flex items-center gap-2 px-5 py-3 bg-white border border-gray-300 rounded-lg text-gray-600 font-medium cursor-pointer transition-all duration-200 shadow-sm hover:bg-gray-50 hover:border-[#FF6B35] hover:text-[#FF6B35] hover:-translate-x-1 group"
            >
                <span class="text-xl transition-transform duration-200 group-hover:-translate-x-1">←</span>
                <span>返回作品集</span>
            </button>
        </div>

        <!-- 專案詳情內容 -->
        <div v-if="currentProject" class="pt-20 pb-16">
            <!-- 標題區 -->
            <div class="py-12 pb-8 text-center">
                <div class="inline-block relative pb-4">
                    <h1 class="text-[2.5rem] font-bold text-gray-800">{{ currentProject.title }}</h1>
                    <div class="absolute bottom-0 left-1/2 -translate-x-1/2 w-3/5 h-[3px] bg-gradient-to-r from-[#FF6B35] to-[#FFA726] rounded-sm"></div>
                </div>
            </div>

            <!-- 內容區 -->
            <div class="flex flex-col gap-8 mx-auto max-w-[75%]">
                <!-- 專案基本資訊 -->
                <div class="flex gap-8 p-6 bg-gradient-to-br from-[#667eea] to-[#764ba2] rounded-xl text-white">
                    <div class="flex gap-2 items-center">
                        <span class="font-semibold opacity-90">專案角色：</span>
                        <span class="font-medium">{{ currentProject.role }}</span>
                    </div>
                    <div class="flex gap-2 items-center">
                        <span class="font-semibold opacity-90">專案時間：</span>
                        <span class="font-medium">{{ currentProject.duration }}</span>
                    </div>
                </div>

                <!-- 專案描述 -->
                <div class="p-6 bg-white rounded-xl shadow-sm border border-gray-200">
                    <h3 class="text-xl font-bold text-gray-800 mb-4 pb-3 border-b-2 border-gray-100">專案描述</h3>
                    <p class="text-gray-600 text-base leading-relaxed text-justify">{{ currentProject.description }}</p>
                </div>

                <!-- 使用技術 -->
                <div class="p-6 bg-white rounded-xl shadow-sm border border-gray-200">
                    <h3 class="text-xl font-bold text-gray-800 mb-4 pb-3 border-b-2 border-gray-100">使用技術</h3>
                    <div class="grid grid-cols-[repeat(auto-fill,minmax(200px,1fr))] gap-4">
                        <div
                            v-for="(tech, index) in currentProject.technologies"
                            :key="index"
                            class="flex items-center gap-3 p-4 bg-gray-50 rounded-lg border border-gray-200 transition-all duration-200 hover:bg-gray-100 hover:border-[#667eea]"
                        >
                            <component
                                v-if="getIconComponent(tech.icon)"
                                :is="getIconComponent(tech.icon)"
                                class="w-8 h-8 shrink-0 text-gray-600"
                            />
                            <div class="flex flex-col gap-1">
                                <span class="font-semibold text-gray-800 text-[0.938rem]">{{ tech.name }}</span>
                                <span v-if="tech.category" class="text-xs text-gray-500">{{ tech.category }}</span>
                            </div>
                        </div>
                    </div>
                </div>

                <!-- 主要功能 -->
                <div v-if="currentProject.features && currentProject.features.length > 0" class="p-6 bg-white rounded-xl shadow-sm border border-gray-200">
                    <h3 class="text-xl font-bold text-gray-800 mb-4 pb-3 border-b-2 border-gray-100">主要功能</h3>
                    <ul class="flex flex-col gap-3">
                        <li
                            v-for="(feature, index) in currentProject.features"
                            :key="index"
                            class="flex items-start gap-3 p-3 bg-gray-50 rounded-lg transition-colors duration-200 hover:bg-gray-100"
                        >
                            <span class="text-[#667eea] text-2xl font-bold leading-none">•</span>
                            <span class="text-gray-600 leading-relaxed flex-1">{{ feature }}</span>
                        </li>
                    </ul>
                </div>

                <!-- 專案成果 -->
                <div v-if="currentProject.achievements && currentProject.achievements.length > 0" class="p-6 bg-white rounded-xl shadow-sm border border-gray-200">
                    <h3 class="text-xl font-bold text-gray-800 mb-4 pb-3 border-b-2 border-gray-100">專案成果</h3>
                    <ul class="flex flex-col gap-3">
                        <li
                            v-for="(achievement, index) in currentProject.achievements"
                            :key="index"
                            class="flex items-start gap-3 p-3 bg-gray-50 rounded-lg transition-colors duration-200 hover:bg-gray-100"
                        >
                            <span class="text-emerald-500 text-xl font-bold">✓</span>
                            <span class="text-gray-600 leading-relaxed flex-1">{{ achievement }}</span>
                        </li>
                    </ul>
                </div>

                <!-- 專案連結 (如果有的話) -->
                <div v-if="currentProject.link" class="p-6 bg-white rounded-xl shadow-sm border border-gray-200">
                    <a
                        :href="currentProject.link"
                        target="_blank"
                        rel="noopener noreferrer"
                        class="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-br from-[#667eea] to-[#764ba2] text-white font-semibold rounded-lg no-underline transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_8px_16px_rgba(102,126,234,0.3)]"
                    >
                        查看專案 →
                    </a>
                </div>

                <!-- 專案截圖 -->
                <div v-if="currentProject.screenshots && currentProject.screenshots.length > 0" class="p-6 bg-white rounded-xl shadow-sm border border-gray-200">
                    <h3 class="text-xl font-bold text-gray-800 mb-4 pb-3 border-b-2 border-gray-100">專案截圖</h3>
                    <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div
                            v-for="(screenshot, index) in currentProject.screenshots"
                            :key="index"
                            class="group relative overflow-hidden rounded-lg border-2 border-gray-200 transition-all duration-300 hover:border-[#667eea] hover:shadow-lg"
                        >
                            <img
                                :src="screenshot.url"
                                :alt="screenshot.caption || `專案截圖 ${index + 1}`"
                                class="w-full h-auto object-cover transition-transform duration-300 group-hover:scale-105"
                            />
                            <div v-if="screenshot.caption" class="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-4">
                                <p class="text-white text-sm font-medium">{{ screenshot.caption }}</p>
                            </div>
                        </div>
                    </div>
                </div>

                <!-- 如果沒有截圖，顯示佔位區塊 -->
                <div v-else class="p-8 bg-white rounded-xl shadow-sm border border-gray-200 border-dashed">
                    <h3 class="text-xl font-bold text-gray-800 mb-4 pb-3 border-b-2 border-gray-100">專案截圖</h3>
                    <div class="flex flex-col items-center justify-center py-12 gap-4">
                        <div class="text-6xl opacity-20">📷</div>
                        <p class="text-gray-400 text-center">專案截圖準備中...</p>
                    </div>
                </div>
            </div>
        </div>

        <!-- 專案不存在提示 -->
        <div v-else class="flex flex-col items-center justify-center min-h-[60vh] gap-8">
            <p class="text-2xl text-gray-500 font-semibold">找不到該專案資料</p>
            <button
                @click="goBack"
                class="px-8 py-4 bg-gradient-to-br from-[#667eea] to-[#764ba2] text-white font-semibold border-0 rounded-lg cursor-pointer transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_8px_16px_rgba(102,126,234,0.3)]"
            >
                返回作品集
            </button>
        </div>
    </div>
</template>

<script lang="ts" setup>
import { useMockStore } from "~/stores/useMockStore";
import { getIconComponent } from '~/utils/iconMap';
import type { IPortfolio } from '~/types/protfolio.interface';

const mockStore = useMockStore();
const router = useRouter();
const route = useRoute();

// 從 URL 參數獲取專案 ID
const projectId = computed(() => route.query.id as string);

// 根據 ID 獲取當前專案資料
const currentProject = computed<IPortfolio | undefined>(() => {
    return mockStore.portfolioPageData.find(project => project.id === projectId.value);
});

// 返回作品集列表
const goBack = () => {
    router.push('/portfolio');
};
</script>
