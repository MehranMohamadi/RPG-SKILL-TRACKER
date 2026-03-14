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

        <div class="flex items-center gap-1 rounded-2xl border border-slate-700 bg-slate-900/70 p-1 text-xs">
          <button
            class="rounded-xl px-3 py-2 transition"
            :class="theme === 'dark' ? 'bg-blue-600 text-white' : 'text-slate-300 hover:bg-slate-800'"
            @click="setTheme('dark')"
          >
            {{ t('app.themeDark') }}
          </button>
          <button
            class="rounded-xl px-3 py-2 transition"
            :class="theme === 'light' ? 'bg-blue-600 text-white' : 'text-slate-300 hover:bg-slate-800'"
            @click="setTheme('light')"
          >
            {{ t('app.themeLight') }}
          </button>
        </div>

        <div class="flex items-center gap-1 rounded-2xl border border-slate-700 bg-slate-900/70 p-1 text-xs">
          <button
            class="rounded-xl px-3 py-2 transition"
            :class="locale === 'en' ? 'bg-blue-600 text-white' : 'text-slate-300 hover:bg-slate-800'"
            @click="setLocale('en')"
          >
            {{ t('app.english') }}
          </button>
          <button
            class="rounded-xl px-3 py-2 transition"
            :class="locale === 'fa' ? 'bg-blue-600 text-white' : 'text-slate-300 hover:bg-slate-800'"
            @click="setLocale('fa')"
          >
            {{ t('app.persian') }}
          </button>
        </div>
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

useHead(() => ({
  htmlAttrs: {
    lang: locale.value,
    dir: isRtl.value ? 'rtl' : 'ltr',
    'data-theme': theme.value
  }
}))
</script>
