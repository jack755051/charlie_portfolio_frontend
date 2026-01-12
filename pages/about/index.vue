<template>
    <div class="scrollable-content-wrapper h-screen overflow-hidden relative">
        <CAnchor
            :anchor-data="anchorData.anchorAboutPage.value"
            class="fixed left-4 top-1/2 transform -translate-y-1/2 z-50"
        ></CAnchor>
        <div class="snap-y snap-mandatory h-full overflow-y-scroll scroll-smooth pt-[60px]">
            <!-- 主要內容區塊 -->
            <div class="w-full">
                <!-- 關於我區塊 -->
                <AboutSection />
                <!-- 經驗區塊 -->
                <ExperienceSection />
                <!-- 技術棧區塊 -->
                <TechnologyStackSection />
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { useAnchor } from "~/composable/useAnchor";
import AboutSection from "~/components/sections/about-section.vue";
import ExperienceSection from "~/components/sections/experience-section.vue";
import TechnologyStackSection from "~/components/sections/technology-stack-section.vue";

const anchorData = useAnchor();
</script>
