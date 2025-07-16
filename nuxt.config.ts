// https://nuxt.com/docs/api/configuration/nuxt-config
import svgLoader from "vite-svg-loader";

export default defineNuxtConfig({
  compatibilityDate: '2025-05-15',
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
