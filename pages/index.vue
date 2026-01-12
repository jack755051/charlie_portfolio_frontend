<template>
  <!-- 可滾動的內容區塊 -->
  <div class="scrollable-content-wrapper h-screen overflow-hidden relative">
    <!-- 錨點導航 - 使用自定義組件 -->
    <CAnchor
      :anchor-data="anchorData.anchorHomePage.value"
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
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import CButton from "~/components/cButton.vue";
import CAnchor from "~/components/cAnchor.vue";
import ScrollSection from "~/layouts/scrollSection.vue";
import { useAnchor } from "~/composable/useAnchor";

const anchorData = useAnchor()

/** 點擊 了解更多 後導航到關於頁面 */
const handlerClickButton = () => {
  navigateTo('/about')
}

</script>

<style scoped>
</style>