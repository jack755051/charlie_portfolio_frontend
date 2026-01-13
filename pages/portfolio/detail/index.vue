<template>
    <div class="min-h-screen bg-slate-50 relative pb-32">
        <div class="absolute inset-0 z-0 opacity-[0.4]" style="background-image: radial-gradient(#cbd5e1 1.5px, transparent 1.5px); background-size: 32px 32px;"></div>
        <div class="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[500px] bg-gradient-to-b from-white/80 to-transparent pointer-events-none z-0"></div>

        <div class="sticky top-0 z-50 w-full px-6 py-4">
            <div class="max-w-7xl mx-auto flex items-center justify-between">
                <button 
                    @click="goBack"
                    class="flex items-center gap-2 px-4 py-2 rounded-full bg-white/90 backdrop-blur border border-slate-200 text-slate-600 hover:border-orange-200 hover:text-orange-500 hover:shadow-md transition-all active:scale-95 group shadow-sm"
                >
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 transition-transform group-hover:-translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                    </svg>
                    <span class="text-sm font-bold">Back to Portfolio</span>
                </button>
                
                <a v-if="currentProject?.link" 
                   :href="currentProject.link" target="_blank"
                   class="hidden md:flex items-center gap-2 px-5 py-2 bg-slate-900 text-white text-sm font-bold rounded-full hover:bg-orange-500 transition-colors shadow-lg"
                >
                    <span>Visit Live Site</span>
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                    </svg>
                </a>
            </div>
        </div>

        <div v-if="currentProject" class="relative z-10 max-w-7xl mx-auto px-6 pt-6">
            
            <div class="text-center max-w-4xl mx-auto mb-12">
                <div class="flex items-center justify-center gap-3 mb-4">
                    <span class="px-3 py-1 rounded-full text-xs font-bold bg-orange-100 text-orange-600 border border-orange-200">
                        {{ currentProject.role }}
                    </span>
                    <span class="w-1 h-1 rounded-full bg-slate-300"></span>
                    <span class="text-slate-500 text-sm font-mono">{{ currentProject.duration }}</span>
                </div>
                <h1 class="text-4xl md:text-6xl font-extrabold text-slate-900 tracking-tight leading-tight mb-6">
                    {{ currentProject.title }}
                </h1>
                <p class="text-lg text-slate-600 leading-relaxed max-w-2xl mx-auto">
                    {{ currentProject.description.slice(0, 100) }}... </p>
            </div>

            <div v-if="currentProject.screenshots?.length" class="mb-16 relative group">
                <div class="absolute -inset-1 bg-gradient-to-r from-orange-500 to-blue-500 rounded-[2rem] opacity-20 blur-xl group-hover:opacity-30 transition-opacity duration-500"></div>
                <div class="relative rounded-[1.5rem] overflow-hidden border border-slate-200 shadow-2xl bg-white">
                    <div class="h-8 bg-slate-100 border-b border-slate-200 flex items-center gap-2 px-4">
                        <div class="w-3 h-3 rounded-full bg-red-400"></div>
                        <div class="w-3 h-3 rounded-full bg-yellow-400"></div>
                        <div class="w-3 h-3 rounded-full bg-green-400"></div>
                    </div>
                    <img :src="currentProject.screenshots[0].url" :alt="currentProject.title" class="w-full h-auto object-cover max-h-[600px] object-top">
                </div>
            </div>

            <div class="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
                
                <div class="lg:col-span-8 space-y-10">
                    
                    <div class="prose prose-slate max-w-none">
                        <h3 class="text-2xl font-bold text-slate-800 mb-4 flex items-center gap-2">
                            關於此專案
                        </h3>
                        <p class="text-slate-600 leading-relaxed text-justify whitespace-pre-line text-lg">
                            {{ currentProject.description }}
                        </p>
                    </div>

                    <div v-if="currentProject.features?.length || currentProject.achievements?.length" class="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div v-if="currentProject.features?.length" class="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm">
                            <h4 class="font-bold text-slate-800 mb-4 flex items-center gap-2">
                                <span class="p-1.5 bg-blue-100 text-blue-600 rounded-lg">
                                    <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>
                                </span>
                                Key Features
                            </h4>
                            <ul class="space-y-3">
                                <li v-for="(feat, i) in currentProject.features" :key="i" class="flex gap-3 text-sm text-slate-600">
                                    <span class="text-blue-500 font-bold">•</span>
                                    {{ feat }}
                                </li>
                            </ul>
                        </div>

                        <div v-if="currentProject.achievements?.length" class="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm">
                            <h4 class="font-bold text-slate-800 mb-4 flex items-center gap-2">
                                <span class="p-1.5 bg-green-100 text-green-600 rounded-lg">
                                    <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                                </span>
                                Achievements
                            </h4>
                            <ul class="space-y-3">
                                <li v-for="(ach, i) in currentProject.achievements" :key="i" class="flex gap-3 text-sm text-slate-600">
                                    <span class="text-green-500 font-bold">✓</span>
                                    {{ ach }}
                                </li>
                            </ul>
                        </div>
                    </div>

                    <div v-if="currentProject.screenshots && currentProject.screenshots.length > 1" class="space-y-6">
                        <h3 class="text-2xl font-bold text-slate-800">Project Gallery</h3>
                        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div v-for="(shot, idx) in currentProject.screenshots.slice(1)" :key="idx" 
                                 class="group relative rounded-2xl overflow-hidden border border-slate-200 shadow-sm hover:shadow-lg transition-all duration-300"
                            >
                                <img :src="shot.url" :alt="shot.caption" class="w-full h-auto object-cover transform group-hover:scale-105 transition-transform duration-700">
                            </div>
                        </div>
                    </div>

                </div>

                <div class="lg:col-span-4 relative">
                    <div class="sticky top-24 space-y-6">
                        
                        <div class="bg-white rounded-3xl p-6 border border-slate-100 shadow-xl shadow-slate-200/50">
                            <h3 class="text-lg font-bold text-slate-800 mb-4">Technologies Used</h3>
                            <div class="flex flex-wrap gap-2">
                                <div v-for="(tech, index) in currentProject.technologies" :key="index"
                                     class="flex items-center gap-2 px-3 py-2 bg-slate-50 border border-slate-100 rounded-lg transition-colors hover:bg-orange-50 hover:border-orange-200 cursor-default"
                                >
                                    <component v-if="getIconComponent(tech.icon)" :is="getIconComponent(tech.icon)" class="w-5 h-5 text-slate-600" />
                                    <span class="text-xs font-bold text-slate-700">{{ tech.name }}</span>
                                </div>
                            </div>
                        </div>

                        <div class="bg-slate-900 rounded-3xl p-6 text-white shadow-xl relative overflow-hidden">
                            <div class="absolute top-0 right-0 -mt-4 -mr-4 w-24 h-24 bg-orange-500 rounded-full blur-2xl opacity-20"></div>
                            
                            <h3 class="text-lg font-bold mb-4 relative z-10">Project Info</h3>
                            <div class="space-y-4 relative z-10 text-sm">
                                <div class="flex justify-between border-b border-slate-700 pb-2">
                                    <span class="text-slate-400">Type</span>
                                    <span class="font-medium">Company Project</span>
                                </div>
                                <div class="flex justify-between border-b border-slate-700 pb-2">
                                    <span class="text-slate-400">Role</span>
                                    <span class="font-medium">{{ currentProject.role }}</span>
                                </div>
                                <div class="flex justify-between border-b border-slate-700 pb-2">
                                    <span class="text-slate-400">Timeline</span>
                                    <span class="font-medium">{{ currentProject.duration }}</span>
                                </div>
                            </div>

                            <a v-if="currentProject.link" :href="currentProject.link" target="_blank"
                               class="mt-6 w-full flex items-center justify-center gap-2 px-4 py-3 bg-white text-slate-900 font-bold rounded-xl hover:bg-orange-500 hover:text-white transition-all"
                            >
                                Open Project
                            </a>
                        </div>

                    </div>
                </div>

            </div>
        </div>

        <div v-else class="flex flex-col items-center justify-center min-h-[60vh] gap-4">
            <p class="text-2xl font-bold text-slate-300">Project Not Found</p>
            <button @click="goBack" class="text-orange-500 font-bold hover:underline">Return to Portfolio</button>
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