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
            :class="['flex-col gap-[20px] !justify-start']"
        >
          <template #title>
            <div :class="['flex w-full items-center justify-center']">
              <p class="underline-title">關於我</p>
            </div>
          </template>
          <template #content>
            <div class="about-section-content mx-auto max-w-[60%] text-justify py-[40px] text-[15px] leading-[2] drop-cap-container">
              因興趣而接觸前端開發，自學過程中逐漸體會到成就感與樂趣，進而立志成為專職工程師。工作上，曾以 Angular 為主要前端框架，參與多項產品與專案開發。因應公司策略調整，目前轉向 Vue 生態系，持續學習 Vue 與 Nuxt 以深化實戰能力。在自學路上從未間斷，進一步學習後端技術，如 Node.js 與 NestJS，從中理解前後端的整體架構與資料流處理。此外亦掌握 Docker，並將容器化技術應用於實際開發與部署環境中，提升開發效率與穩定性。曾參與專案包含《原住民族住宅業務系統》、《原住民族知識體系》等政府平台開發，亦參與產品開發如《Systalk Chat》。閒暇之餘亦會撰寫 side project，嘗試將其中元件獨立封裝為可重用套件並發布至 npm，持續累積技術深度與開源實作經驗。
            </div>
          </template>
          <template #footer>
            <div class="flex flex-row items-center gap-4">
<!--              <DockerIcon class="w-12 h-12" />-->
<!--              <AngularIcon class="w-12 h-12" />-->
<!--              <VueIcon class="w-12 h-12" />-->
<!--              <ReactIcon class="w-12 h-12" />-->
<!--              <MysqlIcon class="w-12 h-12" />-->
<!--              <NestjsIcon class="w-12 h-12" />-->
<!--              <NgrxIcon class="w-12 h-12" />-->
              <GithubIcon class="w-12 h-12" @click="showModal = true"/>
            </div>
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
    <CModal
        v-model="showModal"
        title="基本 Modal"
        @confirm="handleConfirm"
        @cancel="handleCancel"
    >
      <p>這是 Modal 的內容</p>
    </CModal>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import CButton from "~/components/cButton.vue";
import CModal from "~/components/cModal.vue";
import ScrollSection from "~/layouts/scrollSection.vue";
// svg list
import DockerIcon from "assets/image/docker-icon.svg";
import AngularIcon from "assets/image/angular-icon.svg";
import VueIcon from "assets/image/vue-icon.svg";
import ReactIcon from "assets/image/react-icon.svg";
import MysqlIcon from "assets/image/mysql-icon.svg";
import NestjsIcon from "assets/image/nestjs-icon.svg";
import NgrxIcon from "assets/image/ngrx-icon.svg";
import GithubIcon from "assets/image/git-icon.svg"


const section2 = ref<HTMLElement | null>(null);
/** 初始化Section*/
const initSection = ref();
/** 關於我Section*/
const aboutSection = ref()
/** 經歷Section*/
const experienceSection = ref()

const showModal = ref(false)

const handleConfirm = () => {
  console.log('確認')
  showModal.value = false
}

const handleCancel = () => {
  console.log('取消')
}

const handlerClickButton = () =>{
  aboutSection.value?.scrollIntoView({ behavior: 'smooth' })
}
</script>

<style scoped>
</style>