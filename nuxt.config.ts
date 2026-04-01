import process from 'node:process'
import { defineNuxtConfig } from 'nuxt/config'

export default defineNuxtConfig({
  compatibilityDate: '2025-01-01',
  devtools: { enabled: true },
  modules: ['@pinia/nuxt', '@nuxtjs/tailwindcss', '@vite-pwa/nuxt'],
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
        },
        {
          name: 'theme-color',
          content: '#2563eb'
        },
        {
          name: 'apple-mobile-web-app-capable',
          content: 'yes'
        },
        {
          name: 'apple-mobile-web-app-status-bar-style',
          content: 'default'
        },
        {
          name: 'apple-mobile-web-app-title',
          content: 'SkillXP'
        }
      ],
      link: [
        {
          rel: 'apple-touch-icon',
          href: '/apple-touch-icon.png'
        }
      ]
    }
  },
  pwa: {
    registerType: 'autoUpdate',
    manifest: {
      name: 'SkillXP',
      short_name: 'SkillXP',
      description: 'Gamified life skill tracking with XP, levels, and achievements.',
      theme_color: '#2563eb',
      background_color: '#f8fafc',
      display: 'standalone',
      start_url: '/dashboard',
      scope: '/',
      icons: [
        {
          src: '/pwa-192x192.png',
          sizes: '192x192',
          type: 'image/png'
        },
        {
          src: '/pwa-512x512.png',
          sizes: '512x512',
          type: 'image/png'
        },
        {
          src: '/pwa-maskable-512x512.png',
          sizes: '512x512',
          type: 'image/png',
          purpose: 'maskable'
        }
      ]
    },
    workbox: {
      navigateFallback: '/dashboard'
    },
    devOptions: {
      enabled: false,
      type: 'module'
    }
  },
  tailwindcss: {
    viewer: false
  }
})
