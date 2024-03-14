// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
    devtools: { enabled: true },

    css: [
        '~/assets/style/_main.scss'
    ],

    ssr: false,
    modules: ["@nuxt/content"]
})