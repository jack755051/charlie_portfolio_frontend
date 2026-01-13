<template>
    <div class="relative pl-8 md:pl-0">
        <div class="absolute left-8 md:left-1/2 top-0 bottom-0 w-0.5 bg-gradient-to-b from-orange-200 via-orange-100 to-transparent -translate-x-1/2 md:translate-x-0 hidden md:block"></div>
        <div class="absolute left-2 top-0 bottom-0 w-0.5 bg-slate-100 md:hidden"></div>

        <div v-for="(item, index) in timelineData" :key="index" class="relative mb-12 md:mb-24 last:mb-0 group">
            
            <div 
                class="absolute left-2 md:left-1/2 w-4 h-4 rounded-full border-4 border-white shadow-md transform -translate-x-1/2 mt-6 z-10 transition-colors duration-300"
                :class="item.isActive ? 'bg-orange-500 scale-125' : 'bg-slate-300 group-hover:bg-orange-300'"
            ></div>

            <div class="flex flex-col md:flex-row items-start md:items-center justify-between w-full">
                
                <div class="hidden md:block w-[45%] text-right pr-12 pt-4">
                    <div class="text-2xl font-bold text-slate-800">{{ item.company }}</div>
                    <div class="text-orange-500 font-mono font-medium mt-1">{{ item.period }}</div>
                </div>

                <div class="hidden md:block w-[10%]"></div>

                <div class="w-full pl-8 md:pl-0 md:w-[45%]">
                    
                    <div class="md:hidden mb-2">
                        <h3 class="text-xl font-bold text-slate-800">{{ item.company }}</h3>
                        <span class="text-sm text-orange-500 font-mono">{{ item.period }}</span>
                    </div>

                    <div class="relative bg-white p-6 rounded-2xl border border-slate-100 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 group-card">
                        
                        <div v-if="item.isActive" class="absolute -top-3 -right-3 bg-orange-500 text-white text-[10px] px-2 py-1 rounded-full shadow-lg font-bold">
                            CURRENT
                        </div>

                        <h4 class="text-lg font-bold text-slate-700 mb-3 flex items-center gap-2">
                            <span class="w-2 h-2 rounded-full bg-slate-300 group-hover:bg-orange-400 transition-colors"></span>
                            {{ item.role }}
                        </h4>

                        <p class="text-sm text-slate-500 leading-relaxed mb-4 text-justify">
                            {{ item.description }}
                        </p>

                        <div v-if="item.projects.length" class="mb-4">
                            <div class="text-xs font-semibold text-slate-400 uppercase mb-2 tracking-wider">Key Projects</div>
                            <div class="flex flex-wrap gap-2">
                                <span 
                                    v-for="proj in item.projects" 
                                    :key="proj"
                                    class="px-2.5 py-1 bg-slate-50 text-slate-600 text-xs rounded-md border border-slate-200 hover:bg-orange-50 hover:text-orange-600 hover:border-orange-200 transition-colors cursor-default"
                                >
                                    {{ proj }}
                                </span>
                            </div>
                        </div>

                        <div class="pt-4 border-t border-slate-50 flex flex-wrap gap-2">
                            <span v-for="tech in item.stack" :key="tech" class="text-[10px] font-bold text-slate-400 bg-slate-100 px-2 py-0.5 rounded-full">
                                #{{ tech }}
                            </span>
                        </div>

                    </div>
                </div>

            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import type { IExperience } from '~/composable/useExperience';

defineProps<{
    timelineData: IExperience[]
}>()
</script>

<style scoped>
/* 可選：增加一點進場動畫 */
.group-card {
    will-change: transform, box-shadow;
}
</style>