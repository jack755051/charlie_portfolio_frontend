<template>
  <div
    class="default-wrapper flex flex-col relative h-screen w-screen px-5 md:px-8 lg:px-10 py-3 md:py-4 bg-background text-foreground transition-colors duration-500"
  >
    <BaseNavbar />
    <slot />
    <BaseFooter />
  </div>
</template>
<script setup lang="ts"></script>
<style scoped></style>
