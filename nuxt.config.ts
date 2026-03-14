export default defineNuxtConfig({
  compatibilityDate: '2025-01-01',
  devtools: { enabled: true },
  modules: ['@pinia/nuxt', '@nuxtjs/tailwindcss'],
  css: ['~/assets/css/main.css'],
  runtimeConfig: {
    databaseUrl: process.env.DATABASE_URL,
    public: {
      appName: 'SkillXP'
    }
  },
  typescript: {
    strict: true,
    typeCheck: false
  },
  app: {
    head: {
      title: 'SkillXP',
      meta: [
        {
          name: 'viewport',
          content: 'width=device-width, initial-scale=1'
        },
        {
          name: 'description',
          content: 'Gamified life skill tracking with XP, levels, and achievements.'
        }
      ]
    }
  },
  tailwindcss: {
    viewer: false
  }
})
