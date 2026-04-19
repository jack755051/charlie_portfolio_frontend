<template>
  <div
    class="scrollable-content-wrapper h-screen overflow-hidden relative bg-background dark:bg-slate-950 transition-colors duration-500"
  >
    <BackgroundDecor variant="home" />

    <CAnchor
      :anchor-data="anchorData.anchorHomePage.value"
      class="fixed left-2 xl:left-4 top-1/2 -translate-y-1/2 z-40"
    />

    <HomeTerminal />
  </div>
</template>

<script setup lang="ts">
import CAnchor from '~/components/base/anchor.vue'
import BackgroundDecor from '~/components/base/background-decor.vue'
import HomeTerminal from '~/components/features/home-terminal.vue'
import { useAnchor } from '~/composables/useAnchor'

const anchorData = useAnchor()
</script>
