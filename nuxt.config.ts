// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
    devtools: { enabled: true },

    css: [
        '~/assets/style/_main.scss'
    ],

    content: {
        experimental: {
            clientDB: true,
        },
    },
    runtimeConfig: {
        lecinematographeEngineToken: '',
    },

    app: {
        // baseURL: '/lecinematographe.webapp/',
        baseURL: '/',
        pageTransition: {
            name: 'page',
            mode: 'out-in',
        }
    },
    modules: ["@nuxt/content"]
})
