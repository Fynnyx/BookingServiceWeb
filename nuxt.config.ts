import { configDotenv } from "dotenv"

configDotenv()
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
    API_TOKEN: process.env.API_TOKEN,
    public: {
      apiUrl: process.env.API_URL || "https://api.booking.fynnwesterath.ch",
      STRIPE_KEY: process.env.STRIPE_PUBLISHABLE_KEY,
    }
  },
  devtools: { enabled: true }
})
