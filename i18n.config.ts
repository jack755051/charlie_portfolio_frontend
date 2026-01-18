export default defineI18nConfig(() => ({
  legacy: false,
  locale: 'zh',
  messages: {
    en: {
        nav: { about: 'About', experience: 'Experience' },
      // ... 其他靜態文字
    },
    zh: {
      nav: { about: '關於', experience: '經歷' },
      // ... 其他靜態文字
    }
  }
}))