<template>
  <!-- 可滾動的內容區塊 -->
    <div class="scrollable-content-wrapper h-screen overflow-hidden">
      <div class="snap-y snap-mandatory h-full overflow-y-scroll scroll-smooth pt-[60px]"><!-- 加 padding 避免蓋住第一塊 -->
        <section
            ref="section1"
            class="h-screen snap-start flex items-center justify-center"
            :class="['flex-col gap-[20px]']"
        >
          <h1 class="text-4xl">Charlie Tai</h1>
          <p class="text-2xl text-gray-500">研發工程師 / 前端開發</p>
          <CButton
              :label="'了解更多'"
              :size="'lg'"
              :shadow="true"
              @click="handlerClickButton()"
          />
        </section>
        <section
            ref="section2"
            class="h-screen snap-start bg-green-100 flex items-center justify-center">
          <h1 class="text-4xl">區塊 2</h1>
        </section>
        <section
            ref="section3"
            class="h-screen snap-start bg-yellow-100 flex items-center justify-center">
          <h1 class="text-4xl">區塊 3</h1>
        </section>
      </div>
    </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import {CButton} from "#components";

const section2 = ref<HTMLElement | null>(null)

const handlerClickButton = () =>{
  section2.value?.scrollIntoView({ behavior: 'smooth' })
}
</script>

<style scoped>
</style>