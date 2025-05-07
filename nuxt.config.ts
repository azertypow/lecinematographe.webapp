// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },

  devServer: {
      port: 3001
  },

  css: [
      '~/assets/style/_main.scss'
  ],

  app: {
      // baseURL: '/lecinematographe.webapp/',
      baseURL: '/',
      pageTransition: {
          name: 'page',
          mode: 'out-in',
      },
      head: {
          title: 'Le Cinématographe'
      },
  },

  ssr: false,
  compatibilityDate: '2025-03-27'
})
