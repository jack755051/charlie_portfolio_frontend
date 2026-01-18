// https://nuxt.com/docs/api/configuration/nuxt-config
import svgLoader from 'vite-svg-loader'

export default defineNuxtConfig({
  compatibilityDate: '2025-05-15',
  ssr: false,
  app: {
    head: {
      link: [
        { rel: 'icon', type: 'image/x-icon', href: '/charlie_portfolio_frontend/favicon.ico' },
      ],
    },
    baseURL: '/charlie_portfolio_frontend/',
  },
  modules: ['@nuxtjs/tailwindcss', '@pinia/nuxt', '@ant-design-vue/nuxt', '@nuxtjs/i18n'],
  i18n: {
    vueI18n: './i18n.config.ts', // 引入設定檔
    locales: [
      { code: 'en', iso: 'en-US', name: 'English' },
      { code: 'zh', iso: 'zh-TW', name: '繁體中文' }
    ],
    defaultLocale: 'zh',
    strategy: 'no_prefix', // 或 'prefix_except_default' 看你需求
    detectBrowserLanguage: {
      useCookie: true,
      cookieKey: 'i18n_redirected',
      redirectOn: 'root',
    }
  },
  vite: {
    plugins: [svgLoader()],
  },
  css: ['@/assets/css/tailwind.css'],
  devtools: { enabled: true },
  build: {
    transpile: [/echarts/],
  },
  
})
