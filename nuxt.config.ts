// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
    devtools: { enabled: true },

    devServer: {
        port: 3001
    },

    css: [
        '~/assets/style/_main.scss'
    ],

    content: {
        experimental: {
            clientDB: true,
        },
    },

    app: {
        // baseURL: '/lecinematographe.webapp/',
        baseURL: '/',
        pageTransition: {
            name: 'page',
            mode: 'out-in',
        }
    },
    ssr: false,
    modules: ["@nuxt/content"]
})
