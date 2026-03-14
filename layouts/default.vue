<template>
  <div class="page-shell">
    <header
      class="glass-card sticky top-3 z-40 mb-6 flex flex-col gap-4 p-4 sm:p-5"
    >
      <div class="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
      <div>
        <NuxtLink to="/dashboard" class="text-2xl font-semibold tracking-tight text-slate-100">
          SkillXP
        </NuxtLink>
        <p class="section-copy mt-1">
          {{ t('app.subtitle') }}
        </p>
      </div>

      <div class="flex flex-wrap items-center gap-2">
        <nav class="flex flex-wrap items-center gap-2 rounded-2xl bg-slate-900/70 p-1 text-sm">
          <NuxtLink
            to="/dashboard"
            class="rounded-xl px-4 py-2 text-slate-300 transition hover:bg-slate-800 hover:text-white"
            active-class="bg-blue-600 text-white shadow-sm"
          >
            {{ t('app.dashboard') }}
          </NuxtLink>
          <NuxtLink
            to="/skills"
            class="rounded-xl px-4 py-2 text-slate-300 transition hover:bg-slate-800 hover:text-white"
            active-class="bg-blue-600 text-white shadow-sm"
          >
            {{ t('app.skills') }}
          </NuxtLink>
          <NuxtLink
            to="/achievements"
            class="rounded-xl px-4 py-2 text-slate-300 transition hover:bg-slate-800 hover:text-white"
            active-class="bg-blue-600 text-white shadow-sm"
          >
            {{ t('app.achievements') }}
          </NuxtLink>
        </nav>

        <button
          class="flex items-center gap-2 rounded-2xl border border-slate-700 bg-slate-900/70 px-3 py-2 text-xs text-slate-200 transition hover:bg-slate-800"
          :title="theme === 'dark' ? t('app.themeLight') : t('app.themeDark')"
          @click="toggleTheme"
        >
          <svg
            v-if="theme === 'dark'"
            class="h-4 w-4"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M12 3V5" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" />
            <path d="M12 19V21" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" />
            <path d="M4.93 4.93L6.34 6.34" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" />
            <path d="M17.66 17.66L19.07 19.07" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" />
            <path d="M3 12H5" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" />
            <path d="M19 12H21" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" />
            <path d="M4.93 19.07L6.34 17.66" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" />
            <path d="M17.66 6.34L19.07 4.93" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" />
            <circle cx="12" cy="12" r="4" stroke="currentColor" stroke-width="1.8" />
          </svg>
          <svg
            v-else
            class="h-4 w-4"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M20.354 15.354A9 9 0 1 1 8.646 3.646a7 7 0 1 0 11.708 11.708Z"
              stroke="currentColor"
              stroke-width="1.8"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
          </svg>
          <span>{{ theme === 'dark' ? t('app.themeDark') : t('app.themeLight') }}</span>
        </button>

        <button
          class="flex items-center gap-2 rounded-2xl border border-slate-700 bg-slate-900/70 px-3 py-2 text-xs text-slate-200 transition hover:bg-slate-800"
          :title="locale === 'en' ? t('app.persian') : t('app.english')"
          @click="toggleLocale"
        >
          <svg class="h-4 w-4" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M3 12H21" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" />
            <path d="M12 3C14.5 5.3 16 8.5 16 12C16 15.5 14.5 18.7 12 21" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" />
            <path d="M12 3C9.5 5.3 8 8.5 8 12C8 15.5 9.5 18.7 12 21" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" />
            <path d="M4.5 7.5H19.5" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" />
            <path d="M4.5 16.5H19.5" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" />
          </svg>
          <span>{{ locale === 'en' ? t('app.english') : t('app.persian') }}</span>
        </button>
      </div>
      </div>
    </header>

    <main>
      <slot />
    </main>

    <TransitionGroup
      name="fade-up"
      tag="div"
      class="pointer-events-none fixed bottom-4 z-50 flex w-[calc(100%-2rem)] max-w-sm flex-col gap-3"
      :class="isRtl ? 'left-4' : 'right-4'"
    >
      <div
        v-for="toast in toasts"
        :key="toast.id"
        class="pointer-events-auto rounded-2xl border border-slate-700/80 bg-slate-900/95 p-4 shadow-2xl"
      >
        <div class="flex items-start justify-between gap-3">
          <div>
            <p class="text-sm font-semibold text-slate-100">
              {{ toast.title }}
            </p>
            <p class="mt-1 text-sm text-slate-400">
              {{ toast.message }}
            </p>
          </div>
          <button class="text-slate-400 transition hover:text-slate-200" @click="remove(toast.id)">
            {{ t('app.close') }}
          </button>
        </div>
      </div>
    </TransitionGroup>
  </div>
</template>

<script setup lang="ts">
const { toasts, remove } = useToast()
const { locale, isRtl, t, setLocale } = useI18n()
const { theme, setTheme } = useTheme()

const toggleTheme = () => {
  setTheme(theme.value === 'dark' ? 'light' : 'dark')
}

const toggleLocale = () => {
  setLocale(locale.value === 'en' ? 'fa' : 'en')
}

useHead(() => ({
  htmlAttrs: {
    lang: locale.value,
    dir: isRtl.value ? 'rtl' : 'ltr',
    'data-theme': theme.value
  }
}))
</script>
