<template>
  <!-- 可滾動的內容區塊 -->
  <div class="scrollable-content-wrapper h-screen overflow-hidden relative">
    <!-- 錨點導航 - 使用自定義組件 -->
    <CAnchor 
      :anchor-data="mockStore.anchorHomePage" 
      class="fixed left-4 top-1/2 transform -translate-y-1/2 z-50"
    ></CAnchor>
    
    <div class="snap-y snap-mandatory h-full overflow-y-scroll scroll-smooth pt-[60px]">
      <!-- 主要內容區塊 -->
      <div class="w-full">
        <!--初始化-區塊-->
        <ScrollSection ref="initSection" id="section1">
          <template #content>
            <div class="flex flex-col items-center justify-center h-full gap-6">
              <h1 class="text-4xl">Charlie Tai</h1>
              <p class="text-2xl text-gray-500">研發工程師 / 前端開發</p>
              <CButton
                  :label="'了解更多'"
                  :size="'lg'"
                  :shadow="true"
                  @click="handlerClickButton()"
              />
            </div>
          </template>
        </ScrollSection>
        <!--關於我-區塊-->
        <ScrollSection ref="aboutSection" id="section2" :class="['flex-col gap-[50px] !justify-start']" >
          <template #title>
            <div :class="['flex w-full py-6 items-center justify-center']">
              <p class="underline-title">關於我</p>
            </div>
          </template>
          <template #content>
            <div class="about-section-content mx-auto max-w-[60%] text-justify text-[15px] leading-[2] drop-cap-container">
              因興趣而接觸前端開發，自學過程中逐漸體會到成就感與樂趣，進而立志成為專職工程師。工作上，曾以 Angular 為主要前端框架，參與多項產品與專案開發。因應公司策略調整，目前轉向 Vue 生態系，持續學習 Vue 與 Nuxt 以深化實戰能力。在自學路上從未間斷，進一步學習後端技術，如 Node.js 與 NestJS，從中理解前後端的整體架構與資料流處理。此外亦掌握 Docker，並將容器化技術應用於實際開發與部署環境中，提升開發效率與穩定性。曾參與專案包含《原住民族住宅業務系統》、《原住民族知識體系》等政府平台開發，亦參與產品開發如《Systalk Chat》。閒暇之餘亦會撰寫 side project，嘗試將其中元件獨立封裝為可重用套件並發布至 npm，持續累積技術深度與開源實作經驗。
            </div>
          </template>
          <template #footer>
            <div class="flex flex-col gap-6">
              <div class="flex items-center gap-6">
                <GithubIcon class="tech-icon" @click="handlerOpenOtherWindow(ExternalLinks.GITHUB)"/>
                <NpmIcon class="tech-icon" @click="handlerOpenOtherWindow(ExternalLinks.NPM)"/>
              </div>
            </div>
          </template>
        </ScrollSection>
        <!--經驗-區塊-->
        <ScrollSection ref="experienceSection" id="section3" :class="['flex-col gap-[50px] !justify-start']">
          <template #title>
            <div :class="['flex w-full items-center justify-center']">
              <p class="underline-title">我的經驗</p>
            </div>
          </template>
          <template #content>
            <CTimeline :timeline="mockStore.timelineData"></CTimeline>
          </template>
        </ScrollSection>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import CButton from "~/components/cButton.vue";
import CAnchor from "~/components/cAnchor.vue";
import ScrollSection from "~/layouts/scrollSection.vue";
import { ExternalLinks } from "~/apis/url";
// svg list
import GithubIcon from "assets/image/git-icon.svg"
import NpmIcon from "assets/image/npm-icon.svg";
import type { ITimeline } from '~/types/timeline.interface';
import { useMockStore } from "~/stores/useMockStore";

/** 初始化Section */
const initSection = ref();
/** 關於我Section */
const aboutSection = ref()
/** 經歷Section */
const experienceSection = ref()

// TODO:後續用真實的timelineData取代mockStore
/** 時間線資料 */
const timelineData = ref<ITimeline>({
  type: 'alternate',
  data: []
})
/** 時間線資料 */
const mockStore = useMockStore()


/** 點擊 了解更多 後引導頁面下滑 */
const handlerClickButton = () =>{
  aboutSection.value?.scrollIntoView({ behavior: 'smooth' })
}

/** 開啟外部連結 */
const handlerOpenOtherWindow = (url: string) => {
  try {
    window.open(url, '_blank', 'noopener,noreferrer')
  } catch (error) {
    console.error('Failed to open external link:', error)
    // 備用方案：使用 location.href
    window.location.href = url
  }
}

</script>

<style scoped>
</style>