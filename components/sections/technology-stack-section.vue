<template>
    <ScrollSection ref="technologyStackSection" id="section3" :class="['flex-col gap-[50px] !justify-start']">
        <template #title>
            <div class="flex w-full py-6 items-center justify-center">
                <div class="relative pb-2">
                    <p class="text-4xl font-semibold">現有技術棧</p>
                    <div class="absolute bottom-0 left-1/2 -translate-x-1/2 w-3/5 h-0.5 bg-gradient-to-r from-[#FF6B35] to-[#FFA726]"></div>
                </div>
            </div>
        </template>
        <template #content>
            <div class="about-section-content-wrapper w-[60%]">
                <div class="w-full h-auto grid grid-cols-[repeat(auto-fill,minmax(280px,1fr))] gap-4">
                    <CCard
                        v-for="(item, index) in mockStore.processedTechnologyStack"
                        :key="index"
                        :title="item.title"
                        :stack="item.stack"
                    />
                </div>
            </div>
        </template>
    </ScrollSection>
</template>

<script setup lang="ts">
import { useMockStore } from "~/stores/useMockStore";
import CCard from "~/components/cCard.vue";
import ScrollSection from "~/layouts/scrollSection.vue";

const mockStore = useMockStore();
</script>
