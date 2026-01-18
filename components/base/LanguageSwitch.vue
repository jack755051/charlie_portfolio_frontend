<template>
  <div
    class="flex items-center bg-slate-100/80 backdrop-blur-sm rounded-full p-1 border border-slate-200 shadow-inner"
  >
    <button
      v-for="item in availableLocales"
      :key="item.code"
      @click="switchLocale(item.code)"
      class="relative px-4 py-1.5 rounded-full text-sm font-bold transition-all duration-300 ease-out flex items-center gap-2"
      :class="
        currentLocale === item.code
          ? 'bg-white text-orange-500 shadow-md shadow-slate-200'
          : 'text-slate-400 hover:text-slate-600'
      "
    >
      <span class="relative z-10">{{ item.name }}</span>
    </button>
  </div>
</template>

<script setup lang="ts">
const { locale, setLocale } = useI18n()

// 當前語言（響應式）
const currentLocale = computed(() => locale.value)

// 可用的語言選項
const availableLocales = [
  { code: 'zh', name: '中' },
  { code: 'en', name: 'EN' },
]

// 切換語言
const switchLocale = (code: string) => {
  setLocale(code)
}
</script>
