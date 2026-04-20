// https://nuxt.com/docs/api/configuration/nuxt-config
import svgLoader from 'vite-svg-loader'

export default defineNuxtConfig({
  compatibilityDate: '2025-05-15',
  ssr: false,
  experimental: {
    appManifest: false,
  },
  app: {
    head: {
      link: [
        { rel: 'icon', type: 'image/x-icon', href: '/charlie_portfolio_frontend/charlie-logo.ico' },
        { rel: 'preconnect', href: 'https://fonts.googleapis.com' },
        { rel: 'preconnect', href: 'https://fonts.gstatic.com', crossorigin: '' },
        {
          rel: 'stylesheet',
          href: 'https://fonts.googleapis.com/css2?family=Sora:wght@400;600;700;800&family=JetBrains+Mono:wght@400;500;600&display=swap',
        },
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
