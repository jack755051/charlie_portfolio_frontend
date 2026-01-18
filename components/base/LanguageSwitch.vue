<template>
  <div class="flex items-center bg-slate-100/80 backdrop-blur-sm rounded-full p-1 border border-slate-200 shadow-inner">
    
    <button
      @click="setLocale('zh')"
      class="relative px-4 py-1.5 rounded-full text-sm font-bold transition-all duration-300 ease-out flex items-center gap-2"
      :class="locale === 'zh' ? 'bg-white text-orange-500 shadow-md shadow-slate-200' : 'text-slate-400 hover:text-slate-600'"
    >
      <span class="relative z-10">中</span>
    </button>

    <button
      @click="setLocale('en')"
      class="relative px-4 py-1.5 rounded-full text-sm font-bold transition-all duration-300 ease-out flex items-center gap-2"
      :class="locale === 'en' ? 'bg-white text-orange-500 shadow-md shadow-slate-200' : 'text-slate-400 hover:text-slate-600'"
    >
      <span class="relative z-10">EN</span>
    </button>
    
  </div>
</template>

<script setup lang="ts">
const { locale, setLocale } = useI18n()
</script>