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
    vueI18n: './i18n.config.ts',
    lazy: true,
    langDir: 'locales',
    locales: [
      { code: 'en', iso: 'en-US', name: 'English', file: 'en.json' },
      { code: 'zh', iso: 'zh-TW', name: '繁體中文', file: 'zh.json' },
    ],
    defaultLocale: 'zh',
    strategy: 'no_prefix',
    detectBrowserLanguage: {
      useCookie: true,
      cookieKey: 'i18n_redirected',
      redirectOn: 'root',
    },
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
