<template>
  <!-- 可滾動的內容區塊 -->
    <div class="scrollable-content-wrapper h-screen overflow-hidden">
      <div class="snap-y snap-mandatory h-full overflow-y-scroll scroll-smooth pt-[60px]"><!-- 加 padding 避免蓋住第一塊 -->
        <ScrollSection ref="initSection" :class="['flex-col gap-[20px]']">
          <template #content>
            <h1 class="text-4xl">Charlie Tai</h1>
            <p class="text-2xl text-gray-500">研發工程師 / 前端開發</p>
            <CButton
                :label="'了解更多'"
                :size="'lg'"
                :shadow="true"
                @click="handlerClickButton()"
            />
          </template>
        </ScrollSection>
        <!--關於我-區塊-->
        <ScrollSection
            ref="aboutSection"
            :class="['flex-col gap-[20px]']"
        >
          <template #title
                    :class="['flex w-full py-[3rem]']">
            <h1 class="text-4xl">關於我</h1>
          </template>
          <template #content>
            <h1 class="text-4xl">關於我-區塊</h1>
          </template>
        </ScrollSection>
        <!--經驗-區塊-->
        <ScrollSection ref="experienceSection">
          <template #content>
            <h1 class="text-4xl">經驗-區塊</h1>
          </template>
        </ScrollSection>
      </div>
    </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import {CButton} from "#components";
import ScrollSection from "~/layouts/scrollSection.vue";

const section2 = ref<HTMLElement | null>(null);
/** 初始化Section*/
const initSection = ref();
/** 關於我Section*/
const aboutSection = ref()
/** 經歷Section*/
const experienceSection = ref()

const handlerClickButton = () =>{
  aboutSection.value?.scrollIntoView({ behavior: 'smooth' })
}
</script>

<style scoped>
</style>