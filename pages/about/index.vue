<template>
    <div class="scrollable-content-wrapper h-screen overflow-hidden relative">    
        <CAnchor 
            :anchor-data="mockStore.anchorAboutPage" 
            class="fixed left-4 top-1/2 transform -translate-y-1/2 z-50"
        ></CAnchor>
        <div class="snap-y snap-mandatory h-full overflow-y-scroll scroll-smooth pt-[60px]">
            <!-- 主要內容區塊 -->
             <div class="w-full">
                <ScrollSection ref="aboutInit" id="aboutSection1" :class="['flex-col gap-[50px] !justify-start']">
                    <template #title>
                        <div :class="['flex w-full py-6 items-center justify-center']">
                        <p class="underline-title">現有技術棧</p>
                        </div>
                    </template>
                    <template #content>
                        <div class="about-section-content-wrapper w-[60%]">
                            <div class="w-full h-auto flex flex-wrap gap-4">
                                <CCard 
                                    v-for="(item , index) in mockStore.technologyStack" 
                                    :key="index"
                                    :title="item.title"
                                    :stack="item.stack"
                                    class="tech-stack-card"
                                />
                            </div>
                        </div>
                    </template>
                </ScrollSection>
             </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { useMockStore } from "~/stores/useMockStore";
import CCard from "~/components/cCard.vue";
import ScrollSection from "~/layouts/scrollSection.vue";
import { ref } from 'vue'

const mockStore = useMockStore()
</script>

<style scoped>
.tech-stack-card {
    flex: 1;
    min-width: 250px;
    max-width: 300px;
}

.underline-title {
    position: relative;
    padding-bottom: 0.5rem;
}

.underline-title::after {
    content: '';
    position: absolute;
    bottom: 0;
    left: 50%;
    transform: translateX(-50%);
    width: 60%;
    height: 2px;
    background: linear-gradient(90deg, #3b82f6, #8b5cf6);
}
</style>