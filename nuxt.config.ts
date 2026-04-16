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
  modules: ['@nuxtjs/tailwindcss', '@ant-design-vue/nuxt', '@nuxtjs/i18n'],
  i18n: {
    locales: [
      { code: 'en', file: 'en.json' },
      { code: 'zh', file: 'zh.json' },
    ],
    langDir: 'locales',
    defaultLocale: 'zh',
    strategy: 'no_prefix',
    compilation: {
      strictMessage: false,
      escapeHtml: false,
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
