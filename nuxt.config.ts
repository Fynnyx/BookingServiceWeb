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
  ],
  css: ["@/assets/scss/global.scss"],
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
