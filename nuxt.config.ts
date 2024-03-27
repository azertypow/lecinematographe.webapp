// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
    devtools: { enabled: true },

    css: [
        '~/assets/style/_main.scss'
    ],

    // nitro: {
    //     static: true,
    // },

    content: {
        experimental: {
            clientDB: true,
        },
    },

    app: {
        // baseURL: '/lecinematographe.webapp/',
        baseURL: '/',
    },

    ssr: false,
    modules: ["@nuxt/content"]
})
