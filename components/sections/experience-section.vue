<template>
    <ScrollSection ref="experienceSection" id="section2" class="relative">
        <div class="absolute top-1/2 right-0 w-96 h-96 bg-gray-100 rounded-full blur-3xl opacity-50 pointer-events-none -z-10"></div>
        
        <template #title>
            <div class="flex w-full items-center justify-center py-8">
                <div class="relative pb-2">
                    <p class="text-4xl md:text-5xl font-bold text-slate-800">Experience</p>
                    <div class="absolute bottom-0 left-1/2 -translate-x-1/2 w-1/2 h-1 bg-gradient-to-r from-orange-500 to-amber-400 rounded-full"></div>
                </div>
            </div>
        </template>

        <template #content>
            <div class="w-full max-w-5xl mx-auto px-4 py-8">
                <CTimeline :timeline-data="experience.experienceData.value" />
            </div>
        </template>
    </ScrollSection>
</template>

<script setup lang="ts">
import { useExperience } from "~/composable/useExperience"; // 記得改成新的路徑
import CTimeline from "~/components/base/cTimeline.vue";
import ScrollSection from "~/layouts/scrollSection.vue";

const experience = useExperience();
</script>