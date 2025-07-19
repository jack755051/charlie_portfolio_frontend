// https://nuxt.com/docs/api/configuration/nuxt-config
import svgLoader from "vite-svg-loader";

export default defineNuxtConfig({
  compatibilityDate: '2025-05-15',
  ssr: false,
  nitro: {
    preset: 'static'
  },
  app: {
    head: {
      link: [
        { rel: 'icon', type: 'image/x-icon', href: '/charlie_portfolio_frontend/favicon.ico' }
      ]
    },
    baseURL: '/charlie_portfolio_frontend/'
  },
  modules: [
      '@nuxtjs/tailwindcss',
      '@pinia/nuxt',
      '@ant-design-vue/nuxt'
  ],
    vite: {
        plugins: [svgLoader()]
    },
  css: ['@/assets/css/tailwind.css'],
  devtools: { enabled: true },
})
