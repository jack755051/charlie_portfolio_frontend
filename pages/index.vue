<template>
  <div class="scrollable-content-wrapper h-screen overflow-hidden relative bg-slate-50">
    
    <div 
      class="absolute inset-0 z-0 opacity-[0.4]" 
      style="background-image: radial-gradient(#cbd5e1 1.5px, transparent 1.5px); background-size: 32px 32px;"
    ></div>
    
    <div class="absolute top-[-10%] right-[-5%] h-[500px] w-[500px] rounded-full bg-orange-200/40 blur-[120px] pointer-events-none"></div>
    <div class="absolute bottom-[-10%] left-[-10%] h-[400px] w-[400px] rounded-full bg-blue-200/30 blur-[120px] pointer-events-none"></div>

    <CAnchor
      :anchor-data="anchorData.anchorHomePage.value"
      class="fixed left-4 top-1/2 transform -translate-y-1/2 z-50"
    ></CAnchor>
    
    <HomeTerminal />
  </div>
</template>

<script setup lang="ts">
import CAnchor from "~/components/base/anchor.vue"
import HomeTerminal from "~/components/features/home-terminal.vue"
import { useAnchor } from "~/composables/useAnchor"

const anchorData = useAnchor()
</script>

