<template>
  <div class="navbar-wrapper flex justify-between items-center">
    <div class="navbar-image w-16 h-auto cursor-pointer" @click="goBackHomepage()">
      <Logo class="w-full h-auto" />
    </div>
    <div class="navbar-link flex justify-evenly gap-[40px] text-[18px]">
      <NuxtLink
          v-for="i in mockStore.routerLink"
          :key="i.router"
          :to="i.router"
          class="nav-item transition-all duration-300 font-[400] text-gray-500 hover:font-[600] hover:text-gray-800 relative
          after:absolute after:bottom-[-5px] after:left-0 after:h-[2px] after:bg-secondary after:w-0 hover:after:w-full after:transition-all after:duration-300"
      >
        {{ i.label }}
      </NuxtLink>
    </div>
  </div>
</template>

<script setup lang="ts">
import type {RouterLink} from "~/types/foundation.interface";
import { useMockStore } from "~/stores/useMockStore";
import Logo from '~/assets/image/sanring-logo.svg';

const mockStore = useMockStore()
const router = useRouter()
  // 路由 array

  const routerLinkList = ref<RouterLink[]>([])

  // 回到首頁
  const goBackHomepage = () => {
    router.push('/')
  };
  // 取得路由列表
  const getRouterLinkList  = async() =>{

  }

  // 路由 array
</script>

<style scoped></style>