<template>
    <ScrollSection ref="experienceSection" id="section2" :class="['flex-col gap-[50px] !justify-start']">
        <template #title>
            <div class="flex w-full items-center justify-center">
                <div class="relative pb-2">
                    <p class="text-4xl font-semibold">我的經驗</p>
                    <div class="absolute bottom-0 left-1/2 -translate-x-1/2 w-3/5 h-0.5 bg-gradient-to-r from-[#FF6B35] to-[#FFA726]"></div>
                </div>
            </div>
        </template>
        <template #content>
            <CTimeline :timeline="mockStore.timelineData"></CTimeline>
        </template>
    </ScrollSection>
</template>

<script setup lang="ts">
import { useMockStore } from "~/stores/useMockStore";
import CTimeline from "~/components/base/cTimeline.vue";
import ScrollSection from "~/layouts/scrollSection.vue";

const mockStore = useMockStore();
</script>
