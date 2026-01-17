<template>
    <div class="scrollable-content-wrapper h-screen overflow-hidden relative bg-slate-50">
        <div class="absolute inset-0 z-0 opacity-[0.4]" style="background-image: radial-gradient(#cbd5e1 1.5px, transparent 1.5px); background-size: 32px 32px;"></div>
        <div class="absolute top-[-10%] right-[-5%] h-[500px] w-[500px] rounded-full bg-orange-200/40 blur-[120px] pointer-events-none"></div>
        <div class="absolute bottom-[-10%] left-[-10%] h-[400px] w-[400px] rounded-full bg-blue-200/30 blur-[120px] pointer-events-none"></div>

        <CAnchor
            :anchor-data="anchorData.anchorPortfolioPage.value"
            class="fixed left-4 top-1/2 transform -translate-y-1/2 z-50"
        />

        <div class="snap-y snap-mandatory h-full overflow-y-scroll scroll-smooth pt-[80px] relative z-10">
            <div class="w-full pb-20">
                <ScrollSection ref="portfolioSection" id="section1" :class="['flex-col !justify-start']">
                    
                    <template #title>
                        <div class="flex w-full py-8 items-center justify-center">
                            <div class="relative pb-2">
                                <p class="text-4xl md:text-5xl font-bold text-slate-800">Portfolio</p>
                                <div class="absolute bottom-0 left-1/2 -translate-x-1/2 w-1/2 h-1 bg-gradient-to-r from-orange-500 to-amber-400 rounded-full"></div>
                            </div>
                        </div>
                    </template>

                    <template #content>
                        <div v-if="mockStore.portfolioPageData.length === 0" class="flex flex-col items-center justify-center h-64 text-slate-400">
                            <div class="text-6xl mb-4">📂</div>
                            <p>作品集準備中...</p>
                        </div>

                        <div v-else class="w-full max-w-7xl mx-auto px-6 space-y-20">
                            
                            <div v-if="companyProjects.length > 0" class="space-y-8">
                                <div class="flex items-center gap-4">
                                    <div class="p-2 bg-blue-100 rounded-lg text-blue-600">
                                        <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                                        </svg>
                                    </div>
                                    <h3 class="text-2xl font-bold text-slate-800">Company Projects</h3>
                                    <div class="flex-1 h-px bg-slate-200"></div>
                                </div>
                                
                                <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                                    <CPortfolioCard
                                        v-for="project in companyProjects"
                                        :key="project.id"
                                        v-bind="project"
                                        type="company"
                                        @click="handleCardClick"
                                    />
                                </div>
                            </div>

                            <div v-if="personalProjects.length > 0" class="space-y-8">
                                <div class="flex items-center gap-4">
                                    <div class="p-2 bg-orange-100 rounded-lg text-orange-600">
                                        <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                        </svg>
                                    </div>
                                    <h3 class="text-2xl font-bold text-slate-800">Side Projects</h3>
                                    <div class="flex-1 h-px bg-slate-200"></div>
                                </div>

                                <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                                    <CPortfolioCard
                                        v-for="project in personalProjects"
                                        :key="project.id"
                                        v-bind="project"
                                        type="personal"
                                        @click="handleCardClick"
                                    />
                                </div>
                            </div>

                        </div>
                    </template>
                </ScrollSection>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
// ... logic 保持不變，只改 Template 樣式
import { useMockStore } from "~/stores/useMockStore";
import { useAnchor } from "~/composables/useAnchor";
import CAnchor from "~/components/base/anchor.vue";
import CPortfolioCard from "~/components/base/portfolio-card.vue";
import ScrollSection from "~/layouts/scrollSection.vue";

const mockStore = useMockStore();
const anchorData = useAnchor();
const router = useRouter();

const companyProjects = computed(() => {
    return mockStore.portfolioPageData.filter(project =>
        project.id.toLowerCase().includes('systalk') ||
        project.title.toLowerCase().includes('systalk')
    );
});

const personalProjects = computed(() => {
    return mockStore.portfolioPageData.filter(project =>
        !project.id.toLowerCase().includes('systalk') &&
        !project.title.toLowerCase().includes('systalk')
    );
});

const handleCardClick = (projectId: string) => {
    router.push(`/portfolio/detail?id=${projectId}`);
};
</script>