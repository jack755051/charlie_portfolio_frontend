<template>
  <div
    class="flex items-center bg-muted/80 backdrop-blur-sm rounded-full p-1 border border-border shadow-inner"
  >
    <button
      v-for="item in availableLocales"
      :key="item.code"
      class="relative px-4 py-1.5 rounded-full text-sm font-bold transition-all duration-300 ease-out flex items-center gap-2"
      :class="
        currentLocale === item.code
          ? 'bg-card text-primary shadow-md shadow-foreground/10'
          : 'text-muted-foreground hover:text-foreground'
      "
      @click="switchLocale(item.code)"
    >
      <span class="relative z-10">{{ item.name }}</span>
    </button>
  </div>
</template>

<script setup lang="ts">
const { locale, setLocale } = useI18n()
type LocaleCode = 'en' | 'zh'

// 當前語言（響應式）
const currentLocale = computed<LocaleCode>(() => (locale.value === 'en' ? 'en' : 'zh'))

// 可用的語言選項
const availableLocales = [
  { code: 'zh', name: '中' },
  { code: 'en', name: 'EN' },
] as const

// 切換語言
const switchLocale = (code: LocaleCode) => {
  setLocale(code)
}
</script>
