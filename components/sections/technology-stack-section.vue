<template>
    <ScrollSection ref="technologyStackSection" id="section3" class="relative">
        <div class="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-slate-100/50 via-transparent to-transparent pointer-events-none -z-10"></div>

        <template #title>
            <div class="flex w-full py-10 items-center justify-center">
                <div class="relative pb-2">
                    <p class="text-4xl md:text-5xl font-bold text-slate-800">Tech Stack</p>
                    <div class="absolute bottom-0 left-1/2 -translate-x-1/2 w-1/2 h-1 bg-gradient-to-r from-orange-500 to-amber-400 rounded-full"></div>
                </div>
            </div>
        </template>

        <template #content>
            <div class="w-full max-w-6xl mx-auto px-4 pb-20">
                <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    
                    <CTechCard
                        v-for="(category, index) in techStore.techStack.value"
                        :key="index"
                        :title="category.title"
                        :description="category.description"
                        :stack="category.items"
                        :class="category.class" 
                    />
                    
                    <div class="col-span-1 md:col-span-2 lg:col-span-2 bg-slate-900 rounded-3xl p-8 flex flex-col md:flex-row items-center justify-between shadow-xl text-white relative overflow-hidden group">
                        <div class="absolute inset-0 bg-gradient-to-r from-orange-500 to-amber-500 opacity-0 group-hover:opacity-10 transition-opacity duration-500"></div>
                        <div class="z-10 mb-6 md:mb-0 text-center md:text-left">
                            <h3 class="text-2xl font-bold mb-2">持續進化中 🚀</h3>
                            <p class="text-slate-400 text-sm">總是對新技術保持好奇，目前正在深入研究 WebGL 與 WebAssembly。</p>
                        </div>
                        <button class="z-10 px-6 py-3 bg-white text-slate-900 font-bold rounded-full hover:bg-orange-50 transition-colors shadow-lg">
                            下載履歷
                        </button>
                    </div>

                </div>
            </div>
        </template>
    </ScrollSection>
</template>

<script setup lang="ts">
import { useTechStack } from "~/composable/useTechStack";
import CTechCard from "~/components/base/CTechCard.vue"; // 使用新的組件
import ScrollSection from "~/layouts/scrollSection.vue";

const techStore = useTechStack();
</script>