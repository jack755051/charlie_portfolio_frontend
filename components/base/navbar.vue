<template>
  <header
    class="navbar-wrapper sticky top-0 z-50 bg-background/80 backdrop-blur-md border-b border-border/40"
  >
    <div
      class="flex justify-between items-center h-14 md:h-16 max-w-7xl mx-auto px-5 md:px-8 lg:px-10"
    >
      <div class="navbar-image w-14 md:w-16 h-auto cursor-pointer" @click="goBackHomepage()">
        <Logo class="w-full h-auto" />
      </div>

      <!-- Desktop nav -->
      <div class="hidden md:flex justify-evenly gap-10 text-[17px]">
        <NuxtLink
          v-for="i in navigationMenus"
          :key="i.router"
          :to="i.router"
          class="nav-item transition-all duration-300 font-[400] text-muted-foreground relative after:absolute after:bottom-[-5px] after:left-0 after:h-[2px] after:bg-primary after:w-0 after:transition-all after:duration-300"
          :class="{
            'active text-foreground font-[500] after:w-full': $route.path === i.router,
            'hover:font-[600] hover:text-foreground hover:after:w-full': $route.path !== i.router,
          }"
        >
          {{ i.label }}
        </NuxtLink>
      </div>

      <!-- Hamburger (mobile only) -->
      <button
        type="button"
        class="md:hidden inline-flex items-center justify-center h-10 w-10 rounded-full text-foreground/80 hover:bg-foreground/10 transition-colors"
        :aria-expanded="menuOpen"
        aria-controls="mobile-nav-overlay"
        aria-label="Toggle menu"
        @click="menuOpen = true"
      >
        <MenuOutlined style="font-size: 22px" />
      </button>

      <!-- Mobile overlay -->
      <Teleport to="body">
        <Transition name="overlay">
          <div
            v-if="menuOpen"
            id="mobile-nav-overlay"
            class="fixed inset-0 z-[60] bg-background/95 backdrop-blur-xl flex flex-col"
            role="dialog"
            aria-modal="true"
          >
            <div class="flex justify-between items-center px-5 py-4">
              <div class="w-14 h-auto">
                <Logo class="w-full h-auto" />
              </div>
              <button
                type="button"
                class="inline-flex items-center justify-center h-10 w-10 rounded-full text-foreground/80 hover:bg-foreground/10 transition-colors"
                aria-label="Close menu"
                @click="menuOpen = false"
              >
                <CloseOutlined style="font-size: 22px" />
              </button>
            </div>

            <nav class="flex-1 flex flex-col items-center justify-center gap-8 px-6">
              <NuxtLink
                v-for="i in navigationMenus"
                :key="i.router"
                :to="i.router"
                class="text-3xl font-bold tracking-tight transition-colors"
                :class="
                  $route.path === i.router ? 'text-primary' : 'text-foreground hover:text-primary'
                "
                @click="menuOpen = false"
              >
                {{ i.label }}
              </NuxtLink>
            </nav>

            <div class="py-6 text-center text-xs text-muted-foreground">
              © {{ currentYear }} Charlie Tai
            </div>
          </div>
        </Transition>
      </Teleport>
    </div>
  </header>
</template>

<script setup lang="ts">
import { ref, computed, watch, onUnmounted } from 'vue'
import { MenuOutlined, CloseOutlined } from '@ant-design/icons-vue'
import { useSiteReference } from '~/composables/useSiteReference'
import Logo from '~/assets/images/charlie-logo.svg'

const { navigationMenus } = useSiteReference()
const router = useRouter()
const route = useRoute()

const menuOpen = ref(false)
const currentYear = computed(() => new Date().getFullYear())

const goBackHomepage = () => {
  router.push('/')
}

// 當路由變化時自動關閉選單
watch(
  () => route.path,
  () => {
    menuOpen.value = false
  }
)

// 選單開啟時鎖定 body 捲動
watch(menuOpen, open => {
  if (typeof document === 'undefined') return
  document.body.style.overflow = open ? 'hidden' : ''
})

onUnmounted(() => {
  if (typeof document !== 'undefined') document.body.style.overflow = ''
})
</script>

<style scoped>
.nav-item.active {
  font-weight: 600;
}
.nav-item.active::after {
  width: 100%;
}

.overlay-enter-active,
.overlay-leave-active {
  transition:
    opacity 0.28s ease,
    transform 0.28s ease;
}
.overlay-enter-from,
.overlay-leave-to {
  opacity: 0;
  transform: translateY(-8px);
}
</style>
