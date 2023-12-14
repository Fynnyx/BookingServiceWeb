// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  modules: [
    '@nuxtjs/robots',
    [
      "@pinia/nuxt",
      {
        autoImports: ["defineStore", "acceptHMRUpdate"],
      },
    ],
    '@samk-dev/nuxt-vcalendar',
  ],
  css: [
    "@/assets/scss/global.scss",
    '@fortawesome/fontawesome-svg-core/styles.css'
  ],
  vite: {
    css: {
      preprocessorOptions: {
        scss: {
          additionalData: '@use "@/assets/scss/_vars.scss" as *;'
        }
      }
    }
  },
  runtimeConfig: {
    public: {
      apiUrl: process.env.API_URL || "http://localhost:1337"
    }
  },
  devtools: { enabled: true }
})
