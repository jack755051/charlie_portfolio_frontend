<template>
  <div class="snap-y snap-mandatory h-full overflow-y-scroll scroll-smooth relative z-10">
    <div class="w-full">
      <ScrollSection ref="initSection" id="section1">
        <template #content>
          <div class="flex flex-col md:flex-row items-center justify-center h-full w-full max-w-7xl mx-auto px-6 gap-12 md:gap-20">
            
            <div class="flex-1 flex flex-col items-center md:items-start text-center md:text-left space-y-6 z-10">
              <h2 class="text-sm font-bold tracking-widest text-orange-500 uppercase animate-fade-in-up">Hello, I'm</h2>
              
              <h1 class="text-5xl md:text-7xl font-extrabold text-slate-900 tracking-tight leading-tight">
                Charlie Tai
              </h1>

              <div class="text-xl md:text-2xl text-slate-500 font-medium h-8 flex items-center justify-center md:justify-start">
                我是 <span class="ml-2 text-slate-800 border-r-2 border-orange-500 pr-1 animate-pulse">{{ typeWriterText }}</span>
              </div>

              <p class="text-slate-400 leading-relaxed max-w-md text-base md:text-lg">
                專注於打造高效能、高互動的網頁體驗。<br class="hidden md:block" />
                擅長 Angular, Vue 3, Nuxt,  與 Tailwind CSS。
              </p>

              <div class="pt-4 flex gap-4">
                <CButton
                  :label="'了解更多'"
                  :size="'lg'"
                  :shadow="true"
                  custom-class="bg-orange-500 hover:bg-orange-600 text-white border-none"
                  @click="handlerClickButton()"
                />
                <button 
                  class="px-6 py-3 rounded-full border border-slate-300 text-slate-600 font-bold hover:bg-white hover:text-orange-500 transition-colors duration-300"
                  @click="navigateTo('/portfolio')"
                >
                  查看作品
                </button>
              </div>
            </div>

            <div class="flex-1 hidden md:flex justify-center items-center relative perspective-1000">
              <div class="w-full max-w-md bg-slate-900 rounded-xl shadow-2xl overflow-hidden border border-slate-700/50 transform rotate-y-12 rotate-x-6 hover:rotate-0 transition-transform duration-700 ease-out group">
                
                <div class="bg-slate-800 px-4 py-3 flex items-center gap-2 border-b border-slate-700">
                  <div class="w-3 h-3 rounded-full bg-red-500"></div>
                  <div class="w-3 h-3 rounded-full bg-yellow-500"></div>
                  <div class="w-3 h-3 rounded-full bg-green-500"></div>
                  <span class="ml-auto text-xs text-slate-500 font-mono">Profile.vue</span>
                </div>

                <div class="p-6 font-mono text-sm leading-relaxed text-slate-300">
                  <div class="group-hover:translate-x-1 transition-transform duration-300">
                    <span class="text-purple-400">const</span> <span class="text-blue-400">developer</span> = {
                  </div>
                  <div class="pl-4 group-hover:translate-x-2 transition-transform duration-300 delay-75">
                    name: <span class="text-green-400">'Charlie Tai'</span>,
                  </div>
                  <div class="pl-4 group-hover:translate-x-2 transition-transform duration-300 delay-100">
                    role: <span class="text-green-400">'Frontend Engineer'</span>,
                  </div>
                  <div class="pl-4 group-hover:translate-x-2 transition-transform duration-300 delay-150">
                    skills: [
                  </div>
                  <div class="pl-8 text-orange-300 group-hover:translate-x-3 transition-transform duration-300 delay-200">
                    'Angular, Vue 3', 'Nuxt', 'Tailwind'
                  </div>
                  <div class="pl-4 group-hover:translate-x-2 transition-transform duration-300 delay-200">
                    ],
                  </div>
                  <div class="pl-4 group-hover:translate-x-2 transition-transform duration-300 delay-300">
                    status: <span class="text-purple-400">true</span>
                  </div>
                  <div class="group-hover:translate-x-1 transition-transform duration-300 delay-300">
                    };
                  </div>
                </div>
              </div>

              <div class="absolute -z-10 top-6 -right-6 w-full max-w-md h-full border-2 border-dashed border-orange-300/30 rounded-xl"></div>
            </div>

          </div>
        </template>
      </ScrollSection>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'
import CButton from "~/components/base/button.vue"
import ScrollSection from "~/layouts/scrollSection.vue"

/** 點擊 了解更多 後導航到關於頁面 */
const handlerClickButton = () => {
  navigateTo('/about')
}

// --- 打字機效果邏輯 ---
const typeWriterText = ref('')
const phrases = ['研發工程師', '前端開發者', 'UI 設計愛好者']
let phraseIndex = 0
let charIndex = 0
let isDeleting = false
let timer: NodeJS.Timeout | null = null

const typeEffect = () => {
  const currentPhrase = phrases[phraseIndex]
  
  if (isDeleting) {
    typeWriterText.value = currentPhrase.substring(0, charIndex - 1)
    charIndex--
  } else {
    typeWriterText.value = currentPhrase.substring(0, charIndex + 1)
    charIndex++
  }

  let speed = 150

  if (!isDeleting && charIndex === currentPhrase.length) {
    // 打完一句話,停頓久一點
    speed = 2000
    isDeleting = true
  } else if (isDeleting && charIndex === 0) {
    // 刪除完畢,切換下一句
    isDeleting = false
    phraseIndex = (phraseIndex + 1) % phrases.length
    speed = 500
  } else if (isDeleting) {
    // 刪除速度快一點
    speed = 50
  }

  timer = setTimeout(typeEffect, speed)
}

onMounted(() => {
  typeEffect()
})

onUnmounted(() => {
  if (timer) clearTimeout(timer)
})
</script>

<style scoped>
/* 3D 透視效果 */
.perspective-1000 {
  perspective: 1000px;
}
.rotate-y-12 {
  transform: rotateY(-12deg) rotateX(5deg);
}
.rotate-x-6 {
  transform: rotateX(6deg);
}

/* 簡單的淡入動畫 */
@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
.animate-fade-in-up {
  animation: fadeInUp 0.8s ease-out forwards;
}
</style>