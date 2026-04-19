<template>
  <div
    class="default-wrapper flex flex-col relative min-h-screen w-full bg-background text-foreground transition-colors duration-500"
  >
    <BaseNavbar />
    <slot />
    <BaseFooter />
  </div>
</template>
<script setup lang="ts"></script>
<style scoped></style>
