<template>
  <div class="page-shell">
    <header
      class="glass-card sticky top-3 z-40 mb-5 p-3 sm:p-4"
    >
      <div class="flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
        <div class="min-w-0">
          <NuxtLink to="/dashboard" class="text-xl font-semibold tracking-tight text-slate-100 sm:text-2xl">
            SkillXP
          </NuxtLink>
          <p class="section-copy mt-0.5 hidden text-xs sm:block">
            {{ t('app.subtitle') }}
          </p>
        </div>

        <div class="flex flex-wrap items-center gap-1.5 sm:gap-2">
          <nav class="flex flex-wrap items-center gap-1 rounded-xl bg-slate-900/60 p-0.5 text-xs sm:text-sm">
            <NuxtLink
              to="/dashboard"
              class="rounded-lg px-2.5 py-1.5 font-medium text-slate-300 transition hover:bg-slate-800/90 hover:text-white sm:px-3"
              active-class="bg-blue-600 text-white shadow-sm"
            >
              {{ t('app.dashboard') }}
            </NuxtLink>
            <NuxtLink
              to="/skills"
              class="rounded-lg px-2.5 py-1.5 font-medium text-slate-300 transition hover:bg-slate-800/90 hover:text-white sm:px-3"
              active-class="bg-blue-600 text-white shadow-sm"
            >
              {{ t('app.skills') }}
            </NuxtLink>
            <NuxtLink
              to="/achievements"
              class="rounded-lg px-2.5 py-1.5 font-medium text-slate-300 transition hover:bg-slate-800/90 hover:text-white sm:px-3"
              active-class="bg-blue-600 text-white shadow-sm"
            >
              {{ t('app.achievements') }}
            </NuxtLink>
          </nav>

          <button
            class="inline-flex h-8 min-w-8 items-center justify-center gap-1 rounded-lg border border-slate-700 bg-slate-900/60 px-2 text-[11px] font-medium text-slate-200 transition hover:bg-slate-800/90"
            :title="locale === 'en' ? t('app.persian') : t('app.english')"
            @click="toggleLocale"
          >
            <svg class="h-3.5 w-3.5" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M3 12H21" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" />
              <path d="M12 3C14.5 5.3 16 8.5 16 12C16 15.5 14.5 18.7 12 21" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" />
              <path d="M12 3C9.5 5.3 8 8.5 8 12C8 15.5 9.5 18.7 12 21" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" />
              <path d="M4.5 7.5H19.5" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" />
              <path d="M4.5 16.5H19.5" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" />
            </svg>
            <span class="hidden sm:inline">{{ locale === 'en' ? t('app.english') : t('app.persian') }}</span>
            <span class="sm:hidden">{{ locale.toUpperCase() }}</span>
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

const toggleLocale = () => {
  setLocale(locale.value === 'en' ? 'fa' : 'en')
}

useHead(() => ({
  htmlAttrs: {
    lang: locale.value,
    dir: isRtl.value ? 'rtl' : 'ltr',
    'data-theme': 'dark'
  }
}))
</script>
