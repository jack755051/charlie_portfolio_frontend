<template>
  <NuxtLayout>
    <NuxtPage />
    <div class="fixed bottom-6 right-6 z-50">
      <LanguageSwitch />
    </div>
  </NuxtLayout>
</template>
<script setup lang="ts">
  import LanguageSwitch from '~/components/base/LanguageSwitch.vue'
import Index from '~/pages/index.vue'
</script>
