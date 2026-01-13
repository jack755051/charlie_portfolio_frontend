<template>
    <div class="relative pl-8 md:pl-0">
        <div class="absolute left-8 md:left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-orange-200 via-orange-100 to-transparent -translate-x-1/2 md:translate-x-0 hidden md:block"></div>
        <div class="absolute left-2 top-0 bottom-0 w-0.5 bg-slate-100 md:hidden"></div>

        <div v-for="(item, index) in timelineData" :key="index" class="relative mb-12 md:mb-16 last:mb-0 group">
            
            <div 
                class="absolute left-2 md:left-1/2 w-3 h-3 rounded-full border-2 border-white shadow-md transform -translate-x-1/2 mt-6 z-10 transition-colors duration-300"
                :class="item.isActive ? 'bg-orange-500 scale-125' : 'bg-slate-300 group-hover:bg-orange-300'"
            ></div>

            <div class="flex flex-col md:flex-row items-start md:items-top justify-between w-full">
                
                <div class="hidden md:block w-[42%] text-right pr-8 pt-4">
                    <div class="text-xl font-bold text-slate-800">{{ item.company }}</div>
                    <div class="text-orange-500 font-mono text-sm mt-1">{{ item.period }}</div>
                </div>

                <div class="w-full pl-8 md:pl-8 md:w-[48%]">
                    
                    <div class="md:hidden mb-2 ml-2">
                        <h3 class="text-lg font-bold text-slate-800">{{ item.company }}</h3>
                        <span class="text-xs text-orange-500 font-mono">{{ item.period }}</span>
                    </div>

                    <div class="relative bg-white p-5 rounded-xl border border-slate-100 shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all duration-300 group-card">
                        
                        <h4 class="text-base font-bold text-slate-700 mb-2 flex items-center gap-2">
                            <span class="w-1.5 h-1.5 rounded-full bg-slate-300 group-hover:bg-orange-400 transition-colors"></span>
                            {{ item.role }}
                        </h4>

                        <p class="text-sm text-slate-500 leading-relaxed mb-3 text-justify">
                            {{ item.description }}
                        </p>

                        <div v-if="item.projects.length" class="mb-3">
                            <div class="flex flex-wrap gap-1.5">
                                <span 
                                    v-for="proj in item.projects" 
                                    :key="proj"
                                    class="px-2 py-0.5 bg-slate-50 text-slate-600 text-[11px] rounded border border-slate-200"
                                >
                                    {{ proj }}
                                </span>
                            </div>
                        </div>

                        <div class="pt-3 border-t border-slate-50 flex flex-wrap gap-1.5">
                            <span v-for="tech in item.stack" :key="tech" class="text-[10px] font-bold text-slate-400 bg-slate-100 px-1.5 py-0.5 rounded">
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