<template>
    <div class="h-full bg-white rounded-3xl p-6 border border-slate-100 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 group relative overflow-hidden">
        
        <div class="absolute -right-10 -top-10 w-32 h-32 bg-orange-50 rounded-full blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

        <div class="relative z-10 mb-6">
            <h3 class="text-lg font-bold text-slate-800 flex items-center gap-2">
                {{ title }}
            </h3>
            <p v-if="description" class="text-xs text-slate-400 font-medium uppercase tracking-wider mt-1">
                {{ description }}
            </p>
        </div>

        <div class="relative z-10 grid grid-cols-2 sm:grid-cols-3 gap-4">
            <div 
                v-for="(item, index) in stack" 
                :key="index"
                class="flex flex-col items-center justify-center p-3 rounded-xl bg-slate-50 border border-slate-100 group/item hover:bg-white hover:border-orange-200 hover:shadow-md transition-all duration-300 cursor-default"
            >
                <div class="w-8 h-8 mb-2 transition-transform duration-300 group-hover/item:scale-110">
                    <component 
                        v-if="getIconComponent(item.iconName)" 
                        :is="getIconComponent(item.iconName)" 
                        class="w-full h-full fill-current"
                        :class="item.color || 'text-slate-600'" 
                    />
                    <div v-else class="w-full h-full bg-slate-200 rounded-md flex items-center justify-center text-xs font-bold text-slate-400">
                        ?
                    </div>
                </div>
                
                <span class="text-xs font-semibold text-slate-600 group-hover/item:text-slate-900 text-center leading-tight">
                    {{ item.name }}
                </span>
            </div>
        </div>
    </div>
</template>

<script lang="ts" setup>
import type { ITechItem } from '~/composable/useTechStack';
import { getIconComponent } from '~/utils/iconMap'; // 假設您有這個工具

interface Props {
    title: string
    description?: string
    stack: ITechItem[]
}

defineProps<Props>();
</script>