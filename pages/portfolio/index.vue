<template>
    <div class="scrollable-content-wrapper h-screen overflow-hidden relative">
        <CAnchor
            :anchor-data="anchorData.anchorPortfolioPage.value"
            class="fixed left-4 top-1/2 transform -translate-y-1/2 z-50"
        />
        <div class="snap-y snap-mandatory h-full overflow-y-scroll scroll-smooth pt-[60px]">
            <div class="w-full">
                <!-- 作品集區塊 -->
                <ScrollSection ref="portfolioSection" id="section1" :class="['flex-col gap-[50px] !justify-start']">
                    <template #title>
                        <div class="flex w-full py-6 items-center justify-center">
                            <div class="relative pb-2">
                                <p class="text-2xl font-semibold">作品集</p>
                                <div class="absolute bottom-0 left-1/2 -translate-x-1/2 w-3/5 h-0.5 bg-gradient-to-r from-[#FF6B35] to-[#FFA726]"></div>
                            </div>
                        </div>
                    </template>
                    <template #content>
                        <div v-if="mockStore.portfolioPageData.length === 0" class="flex items-center justify-center h-64">
                            <p class="text-gray-500">暫無作品資料</p>
                        </div>
                        <div v-else class="w-[80%] grid grid-cols-[repeat(auto-fill,minmax(350px,1fr))] lg:grid-cols-[repeat(auto-fill,minmax(300px,1fr))] md:grid-cols-1 gap-8 lg:gap-6 md:gap-4 max-w-[1400px] mx-auto">
                            <CPortfolioCard
                                v-for="project in mockStore.portfolioPageData"
                                :key="project.id"
                                :id="project.id"
                                :title="project.title"
                                :description="project.description"
                                :role="project.role"
                                :duration="project.duration"
                                :technologies="project.technologies"
                                @click="handleCardClick"
                            />
                        </div>
                    </template>
                </ScrollSection>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { useMockStore } from "~/stores/useMockStore";
import { useAnchor } from "~/composable/useAnchor";
import CPortfolioCard from "~/components/cPortfolioCard.vue";
import ScrollSection from "~/layouts/scrollSection.vue";

const mockStore = useMockStore();
const anchorData = useAnchor();
const router = useRouter();

/** 處理卡片點擊事件 */
const handleCardClick = (projectId: string) => {
    router.push(`/portfolio/detail?id=${projectId}`);
};
</script>