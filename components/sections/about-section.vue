<template>
    <ScrollSection ref="aboutSection" id="section1" :class="['flex-col gap-[50px] !justify-start']">
        <template #title>
            <div class="flex w-full py-6 items-center justify-center">
                <div class="relative pb-2">
                    <p class="text-4xl font-semibold">關於我</p>
                    <div class="absolute bottom-0 left-1/2 -translate-x-1/2 w-3/5 h-0.5 bg-gradient-to-r from-[#FF6B35] to-[#FFA726]"></div>
                </div>
            </div>
        </template>
        <template #content>
            <div class="about-section-content mx-auto max-w-[60%] text-justify text-[15px] leading-[2] drop-cap-container">
                {{ aboutData.aboutMeDescription }}
            </div>
        </template>
        <template #footer>
            <div class="flex flex-col gap-6">
                <div class="flex items-center gap-6">
                    <GithubIcon class="tech-icon" @click="handlerOpenOtherWindow(ExternalLinks.GITHUB)" />
                    <NpmIcon class="tech-icon" @click="handlerOpenOtherWindow(ExternalLinks.NPM)" />
                </div>
            </div>
        </template>
    </ScrollSection>
</template>

<script setup lang="ts">
import ScrollSection from "~/layouts/scrollSection.vue";
import { ExternalLinks } from "~/apis/url";
import GithubIcon from "assets/image/git-icon.svg";
import NpmIcon from "assets/image/npm-icon.svg";
import { openExternalLink } from "~/utils/navigation";
import { useAbout } from "~/composable/useAbout";

const aboutData = useAbout();

/** 開啟外部連結 */
const handlerOpenOtherWindow = openExternalLink;
</script>
