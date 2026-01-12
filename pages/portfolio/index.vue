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
                        <div :class="['flex w-full py-6 items-center justify-center']">
                            <p class="underline-title">作品集</p>
                        </div>
                    </template>
                    <template #content>
                        <div v-if="mockStore.portfolioPageData.length === 0" class="flex items-center justify-center h-64">
                            <p class="text-gray-500">暫無作品資料</p>
                        </div>
                        <div v-else class="portfolio-cards-wrapper w-[80%]">
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

<style scoped>
.portfolio-cards-wrapper {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));
    gap: 2rem;
    width: 100%;
    max-width: 1400px;
    margin: 0 auto;
}

.underline-title {
    position: relative;
    padding-bottom: 0.5rem;
}

.underline-title::after {
    content: '';
    position: absolute;
    bottom: 0;
    left: 50%;
    transform: translateX(-50%);
    width: 60%;
    height: 2px;
    background: linear-gradient(90deg, #FF6B35, #FFA726);
}

/* 響應式設計 */
@media (max-width: 1024px) {
    .portfolio-cards-wrapper {
        grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
        gap: 1.5rem;
    }
}

@media (max-width: 768px) {
    .portfolio-cards-wrapper {
        grid-template-columns: 1fr;
        gap: 1rem;
    }
}
</style>