// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
    devtools: { enabled: true },

    css: [
        '~/assets/style/_main.scss'
    ],


    app: {
        baseURL: '/lecinematographe.webapp/',
    },

    ssr: false,
    modules: ["@nuxt/content"]
})
