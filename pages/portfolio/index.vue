<template>
    <div class="h-screen relative">
        <div v-if="mockStore.portfolioPageData === null" class="flex items-center justify-center h-full">
            <a-empty />
        </div>
        <div v-else>
            <CAnchor 
                :anchor-data="mockStore.anchorPortfolioPage" 
                class="fixed left-4 top-1/2 transform -translate-y-1/2 z-50"
            ></CAnchor>
        </div>
    </div>
</template>

<script setup lang="ts">
import { useMockStore } from "~/stores/useMockStore";

const mockStore = useMockStore();
</script>