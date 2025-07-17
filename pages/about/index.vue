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
                        <div class="about-section-content mx-auto max-w-[60%] text-justify text-[15px] leading-[2] drop-cap-container">
                            <AngularIcon class="tech-icon"></AngularIcon>
                            <VueIcon class="tech-icon"></VueIcon>
                            <MysqlIcon class="tech-icon"></MysqlIcon>
                            <MongoDBIcon class="tech-icon"></MongoDBIcon>
                            <DockerIcon class="tech-icon"></DockerIcon>
                        </div>
                    </template>
                </ScrollSection>
             </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { useMockStore } from "~/stores/useMockStore";
import { ref } from 'vue'

import  ScrollSection  from "~/layouts/scrollSection.vue";
import AngularIcon from "/assets/image/angular-icon.svg";
import MysqlIcon from "/assets/image/mysql-icon.svg";
import MongoDBIcon from "/assets/image/mongodb-icon.svg";
import VueIcon from "/assets/image/vue-icon.svg";
import DockerIcon from "/assets/image/docker-icon.svg";


const mockStore = useMockStore()
</script>