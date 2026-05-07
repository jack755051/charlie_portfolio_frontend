<template>
  <div
    class="snap-y snap-proximity h-full overflow-y-scroll scroll-smooth relative z-10 transition-colors duration-500"
  >
    <div class="w-full relative">
      <ScrollSection id="section1" ref="initSection">
        <template #content>
          <div
            class="grid grid-cols-1 md:grid-cols-2 items-center justify-center gap-10 sm:gap-14 md:gap-16 lg:gap-20 w-full max-w-7xl mx-auto px-5 sm:px-8 lg:px-10"
          >
            <!-- 左：文字區 -->
            <div
              v-motion="motion.heading"
              class="flex flex-col items-center md:items-start text-center md:text-left space-y-5 sm:space-y-6 z-10 order-2 md:order-1"
            >
              <span
                class="inline-flex items-center gap-2 rounded-full border border-primary/30 bg-card/60 backdrop-blur px-3 py-1 text-[11px] sm:text-xs font-semibold tracking-[0.2em] text-primary uppercase shadow-sm"
              >
                <span class="h-1.5 w-1.5 rounded-full bg-primary animate-pulse" />
                {{ $t('home.greeting') }}
              </span>

              <h1
                class="font-display font-extrabold tracking-tight leading-[1.05] text-4xl sm:text-5xl md:text-6xl lg:text-7xl"
              >
                <span
                  class="bg-gradient-to-r from-primary via-rose-500 to-fuchsia-500 bg-clip-text text-transparent drop-shadow-[0_1px_24px_rgba(255,107,53,0.35)]"
                >
                  {{ $t('home.name') }}
                </span>
              </h1>

              <div
                class="min-h-[2.25rem] sm:min-h-[2.5rem] flex flex-wrap items-center justify-center md:justify-start gap-x-2 text-lg sm:text-xl md:text-2xl font-medium text-muted-foreground"
              >
                <span>{{ $t('home.introPrefix') }}</span>
                <span class="inline-flex items-center text-foreground font-semibold">
                  <span>{{ typeWriterText }}</span>
                  <span
                    class="ml-0.5 inline-block h-5 sm:h-6 md:h-7 w-[2px] bg-primary animate-blink"
                    aria-hidden="true"
                  />
                </span>
              </div>

              <p
                class="text-sm sm:text-base md:text-lg leading-relaxed max-w-md text-muted-foreground"
              >
                <span>{{ $t('home.descriptionLead') }}</span>
                <span class="md:block"> {{ $t('home.descriptionTail') }}</span>
              </p>

              <div
                class="pt-2 sm:pt-4 flex flex-wrap justify-center md:justify-start gap-3 sm:gap-4"
              >
                <CButton
                  variant="primary"
                  size="lg"
                  :label="$t('home.buttons.about')"
                  @click="handlerClickButton()"
                />
                <CButton
                  variant="secondary"
                  size="lg"
                  :label="$t('home.buttons.portfolio')"
                  @click="navigateTo('/portfolio')"
                />
              </div>
            </div>

            <!-- 右：Terminal 卡片（手機也顯示） -->
            <div
              v-motion="motion.section"
              class="flex justify-center items-center relative perspective-1000 order-1 md:order-2 w-full"
            >
              <div
                class="relative w-full max-w-[320px] sm:max-w-sm md:max-w-md bg-slate-900 dark:bg-slate-900/90 rounded-2xl shadow-2xl shadow-slate-900/20 dark:shadow-black/60 ring-1 ring-white/10 overflow-hidden rotate-card hover:rotate-reset transition-transform duration-700 ease-out group backdrop-blur"
              >
                <!-- Terminal header -->
                <div
                  class="bg-slate-800/90 px-4 py-3 flex items-center gap-2 border-b border-slate-700/80"
                >
                  <span
                    class="h-3 w-3 rounded-full bg-red-500 shadow-[0_0_6px_rgba(239,68,68,0.8)]"
                  />
                  <span
                    class="h-3 w-3 rounded-full bg-yellow-500 shadow-[0_0_6px_rgba(234,179,8,0.8)]"
                  />
                  <span
                    class="h-3 w-3 rounded-full bg-green-500 shadow-[0_0_6px_rgba(34,197,94,0.8)]"
                  />
                  <span class="ml-auto text-xs text-slate-400 font-mono tracking-wide"
                    >Profile.vue</span
                  >
                </div>

                <!-- Code body -->
                <div
                  class="p-5 sm:p-6 font-mono text-[13px] sm:text-sm leading-relaxed text-slate-300 space-y-1"
                >
                  <div
                    class="flex gap-4 group-hover:translate-x-1 transition-transform duration-300"
                  >
                    <span class="select-none text-slate-600 w-4 text-right">1</span>
                    <span>
                      <span class="text-purple-400">const</span>
                      <span class="text-sky-400"> developer</span>
                      <span class="text-slate-400"> = </span>
                      <span class="text-slate-200">{</span>
                    </span>
                  </div>
                  <div
                    class="flex gap-4 group-hover:translate-x-2 transition-transform duration-300 delay-75"
                  >
                    <span class="select-none text-slate-600 w-4 text-right">2</span>
                    <span>
                      <span class="text-rose-300">name</span>:
                      <span class="text-emerald-300">'{{ $t('home.name') }}'</span>,
                    </span>
                  </div>
                  <div
                    class="flex gap-4 group-hover:translate-x-2 transition-transform duration-300 delay-100"
                  >
                    <span class="select-none text-slate-600 w-4 text-right">3</span>
                    <span>
                      <span class="text-rose-300">role</span>:
                      <span class="text-emerald-300">{{ $t('home.codeBlock.role') }}</span
                      >,
                    </span>
                  </div>
                  <div
                    class="flex gap-4 group-hover:translate-x-2 transition-transform duration-300 delay-150"
                  >
                    <span class="select-none text-slate-600 w-4 text-right">4</span>
                    <span> <span class="text-rose-300">skills</span>: [ </span>
                  </div>
                  <div
                    class="flex gap-4 group-hover:translate-x-3 transition-transform duration-300 delay-200"
                  >
                    <span class="select-none text-slate-600 w-4 text-right">5</span>
                    <span class="text-amber-300 break-all">
                      {{ $t('home.codeBlock.skills') }}
                    </span>
                  </div>
                  <div
                    class="flex gap-4 group-hover:translate-x-2 transition-transform duration-300 delay-200"
                  >
                    <span class="select-none text-slate-600 w-4 text-right">6</span>
                    <span>],</span>
                  </div>
                  <div
                    class="flex gap-4 group-hover:translate-x-2 transition-transform duration-300 delay-300"
                  >
                    <span class="select-none text-slate-600 w-4 text-right">7</span>
                    <span>
                      <span class="text-rose-300">status</span>:
                      <span class="text-purple-400">true</span>
                    </span>
                  </div>
                  <div
                    class="flex gap-4 group-hover:translate-x-1 transition-transform duration-300 delay-300"
                  >
                    <span class="select-none text-slate-600 w-4 text-right">8</span>
                    <span class="text-slate-200">
                      };<span
                        class="ml-1 inline-block h-4 w-[8px] bg-emerald-400/80 align-middle animate-blink"
                        aria-hidden="true"
                      />
                    </span>
                  </div>
                </div>

                <!-- subtle glow ring on hover -->
                <div
                  class="pointer-events-none absolute inset-0 rounded-2xl ring-1 ring-inset ring-orange-500/0 group-hover:ring-orange-500/40 transition duration-500"
                />
              </div>

              <!-- 裝飾邊框（手機縮小）-->
              <div
                class="pointer-events-none absolute -z-10 top-4 sm:top-6 -right-3 sm:-right-6 w-full max-w-[320px] sm:max-w-sm md:max-w-md h-full border-2 border-dashed border-orange-300/40 dark:border-orange-400/25 rounded-2xl"
              />
            </div>
          </div>
        </template>
      </ScrollSection>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted, watch } from 'vue'
import { useI18n } from 'vue-i18n'
import CButton from '~/components/base/button.vue'
import ScrollSection from '~/layouts/scrollSection.vue'

const { locale, tm, rt } = useI18n()
const motion = useMotionPresets()

/** 點擊 了解更多 後導航到關於頁面 */
const handlerClickButton = () => {
  navigateTo('/about')
}

// --- 打字機效果邏輯 ---
const typeWriterText = ref('')
// 初始獲取片語陣列 (使用 rt 解析 tm 返回的物件)
let phrases: string[] = []

let phraseIndex = 0
let charIndex = 0
let isDeleting = false
let timer: ReturnType<typeof setTimeout> | null = null

// 透過 vue-i18n runtime 取出當前語系的片語陣列
// 使用 tm() 取訊息樹，再以 rt() 解析為純字串，避免拿到預編譯函式
const getPhrases = (): string[] => {
  const raw = tm('home.roles') as unknown[]
  if (!Array.isArray(raw)) return []
  return raw.map(item => rt(item as Parameters<typeof rt>[0]))
}

const typeEffect = () => {
  // 安全檢查：如果沒有片語，直接返回
  if (!phrases.length) return

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
    speed = 2000
    isDeleting = true
  } else if (isDeleting && charIndex === 0) {
    isDeleting = false
    phraseIndex = (phraseIndex + 1) % phrases.length
    speed = 500
  } else if (isDeleting) {
    speed = 50
  }

  timer = setTimeout(typeEffect, speed)
}

// 初始化與重置打字機
const startTypeWriter = () => {
  // 清除舊 timer
  if (timer) clearTimeout(timer)

  // 更新資料源
  phrases = getPhrases()

  // 重置狀態
  phraseIndex = 0
  charIndex = 0
  isDeleting = false
  typeWriterText.value = ''

  // 啟動
  typeEffect()
}

onMounted(() => {
  startTypeWriter()
})

onUnmounted(() => {
  if (timer) clearTimeout(timer)
})

// 監聽語言變化，即時更新打字機內容
watch(locale, () => {
  startTypeWriter()
})
</script>

<style scoped>
/* 3D 透視效果 */
.perspective-1000 {
  perspective: 1200px;
}

/* 預設傾斜：桌機才出現 3D；手機保持正面方便閱讀 */
.rotate-card {
  transform: rotateY(0deg) rotateX(0deg);
}
@media (min-width: 768px) {
  .rotate-card {
    transform: rotateY(-10deg) rotateX(5deg);
  }
}
.rotate-reset {
  transform: rotateY(0deg) rotateX(0deg);
}

/* 尊重使用者減少動畫偏好 */
@media (prefers-reduced-motion: reduce) {
  :deep(.animate-float-slow),
  :deep(.animate-blink) {
    animation: none !important;
  }
  .rotate-card,
  .rotate-reset {
    transform: none !important;
  }
}
</style>
