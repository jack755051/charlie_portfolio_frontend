<template>
  <div class="default-wrapper flex flex-col relative h-screen w-screen px-[30px] py-[10px] bg-background">
    <!-- 固定的 Navbar -->
    <Navbar/>
    <slot />
    <Footer/>
  </div>


</template>
<script setup lang="ts">

</script>
<style scoped></style>