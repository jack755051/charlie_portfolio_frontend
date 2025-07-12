<template>
  <!-- 可滾動的內容區塊 -->
    <div class="scrollable-content-wrapper h-screen overflow-hidden">
      <div class="snap-y snap-mandatory h-full overflow-y-scroll scroll-smooth pt-[60px]"><!-- 加 padding 避免蓋住第一塊 -->
        <section class="h-screen snap-start bg-blue-100 flex items-center justify-center">
          <h1 class="text-4xl">區塊 1</h1>
        </section>
        <section class="h-screen snap-start bg-green-100 flex items-center justify-center">
          <h1 class="text-4xl">區塊 2</h1>
        </section>
        <section class="h-screen snap-start bg-yellow-100 flex items-center justify-center">
          <h1 class="text-4xl">區塊 3</h1>
        </section>
      </div>
    </div>
</template>

<script setup lang="ts">
</script>

<style scoped>
</style>