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
    STRIPE_SECRET_KEY: process.env.STRIPE_SECRET_KEY,
    STRIPE_ENDPOINT_SECRET: process.env.STRIPE_ENDPOINT_SECRET,
    public: {
      apiUrl: process.env.API_URL || "http://localhost:1337",
      STRIPE_KEY: process.env.STRIPE_PUBLISHABLE_KEY,
    }
  },
  devtools: { enabled: true }
})
