<template>
    <div class="min-h-screen bg-slate-50 relative pb-20">
        <div class="absolute inset-0 z-0 opacity-[0.4]" style="background-image: radial-gradient(#cbd5e1 1.5px, transparent 1.5px); background-size: 32px 32px;"></div>
        
        <div class="sticky top-0 z-50 w-full px-6 py-4 flex items-center justify-between bg-white/80 backdrop-blur-md border-b border-slate-200/60">
            <button 
                @click="goBack"
                class="flex items-center gap-2 px-4 py-2 rounded-full bg-white border border-slate-200 text-slate-600 hover:border-orange-200 hover:text-orange-500 hover:shadow-md transition-all active:scale-95 group"
            >
                <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 transition-transform group-hover:-translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                </svg>
                <span class="text-sm font-bold">Back</span>
            </button>
            
            <span class="md:hidden font-bold text-slate-800 truncate max-w-[150px]">{{ currentProject?.title }}</span>
            
            <div class="w-[80px]"></div>
        </div>

        <div v-if="currentProject" class="relative z-10 max-w-6xl mx-auto px-6 pt-10">
            
            <div class="mb-12">
                <div class="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-6">
                    <div>
                        <div class="flex items-center gap-3 mb-2">
                            <span class="px-3 py-1 rounded-full text-xs font-bold bg-orange-100 text-orange-600 border border-orange-200">
                                {{ currentProject.role }}
                            </span>
                            <span class="text-slate-400 text-sm font-mono">{{ currentProject.duration }}</span>
                        </div>
                        <h1 class="text-4xl md:text-6xl font-extrabold text-slate-900 tracking-tight leading-tight">
                            {{ currentProject.title }}
                        </h1>
                    </div>
                    
                    <a v-if="currentProject.link" 
                       :href="currentProject.link" target="_blank"
                       class="flex items-center gap-2 px-6 py-3 bg-slate-900 text-white rounded-xl hover:bg-orange-500 hover:shadow-lg hover:shadow-orange-500/30 transition-all duration-300"
                    >
                        <span>Visit Project</span>
                        <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                        </svg>
                    </a>
                </div>
                <div class="h-px w-full bg-gradient-to-r from-slate-200 via-slate-200 to-transparent"></div>
            </div>

            <div class="grid grid-cols-1 lg:grid-cols-3 gap-6">
                
                <div class="lg:col-span-2 space-y-6">
                    
                    <div class="bg-white rounded-3xl p-8 border border-slate-100 shadow-sm">
                        <h3 class="text-lg font-bold text-slate-800 mb-4 flex items-center gap-2">
                            <span class="w-2 h-6 bg-orange-500 rounded-full"></span>
                            Project Overview
                        </h3>
                        <p class="text-slate-600 leading-relaxed text-justify whitespace-pre-line">
                            {{ currentProject.description }}
                        </p>
                    </div>

                    <div v-if="currentProject.screenshots?.length" class="space-y-6">
                        <div v-for="(shot, idx) in currentProject.screenshots" :key="idx" 
                             class="group relative bg-slate-200 rounded-3xl overflow-hidden border border-slate-200 shadow-sm"
                        >
                            <img :src="shot.url" :alt="shot.caption" class="w-full h-auto object-cover transform group-hover:scale-105 transition-transform duration-700">
                            <div v-if="shot.caption" class="absolute bottom-0 inset-x-0 bg-black/60 backdrop-blur-sm p-4 text-white text-sm">
                                {{ shot.caption }}
                            </div>
                        </div>
                    </div>

                </div>

                <div class="lg:col-span-1 space-y-6">
                    
                    <div class="bg-white rounded-3xl p-6 border border-slate-100 shadow-sm sticky top-24">
                        <h3 class="text-lg font-bold text-slate-800 mb-4">Technologies</h3>
                        <div class="flex flex-wrap gap-2">
                            <div v-for="(tech, index) in currentProject.technologies" :key="index"
                                 class="flex items-center gap-2 px-3 py-2 bg-slate-50 border border-slate-100 rounded-lg hover:border-orange-200 hover:bg-orange-50 transition-colors cursor-default"
                            >
                                <component v-if="getIconComponent(tech.icon)" :is="getIconComponent(tech.icon)" class="w-5 h-5 text-slate-600" />
                                <span class="text-xs font-bold text-slate-700">{{ tech.name }}</span>
                            </div>
                        </div>

                        <div v-if="currentProject.features?.length || currentProject.achievements?.length" class="mt-8 pt-6 border-t border-slate-100">
                            <h3 class="text-lg font-bold text-slate-800 mb-4">Highlights</h3>
                            
                            <div v-if="currentProject.achievements?.length" class="space-y-3 mb-6">
                                <div v-for="(ach, i) in currentProject.achievements" :key="i" class="flex gap-3 items-start">
                                    <span class="text-green-500 mt-1">
                                        <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                                            <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd" />
                                        </svg>
                                    </span>
                                    <span class="text-sm text-slate-600">{{ ach }}</span>
                                </div>
                            </div>

                            <div v-if="currentProject.features?.length" class="space-y-3">
                                <div v-for="(feat, i) in currentProject.features" :key="i" class="flex gap-3 items-start">
                                    <span class="text-orange-400 mt-1">•</span>
                                    <span class="text-sm text-slate-600">{{ feat }}</span>
                                </div>
                            </div>
                        </div>
                    </div>

                </div>

            </div>
        </div>

        <div v-else class="flex flex-col items-center justify-center min-h-[60vh] gap-4">
            <p class="text-xl text-slate-400">Project Not Found</p>
            <button @click="goBack" class="text-orange-500 font-bold hover:underline">Go Back</button>
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

const projectId = computed(() => route.query.id as string);

const currentProject = computed<IPortfolio | undefined>(() => {
    return mockStore.portfolioPageData.find(project => project.id === projectId.value);
});

const goBack = () => {
    router.push('/portfolio');
};
</script>