<template>
  <div class="mx-auto grid max-w-5xl gap-6 lg:grid-cols-[minmax(0,1fr)_420px]">
    <section class="glass-card rounded-[2rem] p-6 sm:p-8">
      <p class="text-sm font-semibold uppercase tracking-[0.24em] text-cyan-300">SkillXP Access</p>
      <h1 class="mt-4 text-3xl font-extrabold leading-tight text-white sm:text-4xl">
        {{ isRegisterMode ? 'Create your account and start leveling up.' : 'Welcome back. Pick up your momentum.' }}
      </h1>
      <p class="mt-4 max-w-xl text-sm leading-7 text-slate-300 sm:text-base">
        {{ isRegisterMode
          ? 'Use a simple email and password to create your personal SkillXP workspace.'
          : 'Sign in to continue tracking skills, activities, streaks, and achievements.' }}
      </p>

      <div class="mt-8 grid gap-4 sm:grid-cols-3">
        <div class="rounded-2xl border border-slate-800 bg-slate-950/70 p-4">
          <p class="text-sm font-semibold text-white">Skills</p>
          <p class="mt-1 text-sm leading-6 text-slate-400">Keep each growth track focused and visible.</p>
        </div>
        <div class="rounded-2xl border border-slate-800 bg-slate-950/70 p-4">
          <p class="text-sm font-semibold text-white">XP</p>
          <p class="mt-1 text-sm leading-6 text-slate-400">Turn consistent action into visible progress.</p>
        </div>
        <div class="rounded-2xl border border-slate-800 bg-slate-950/70 p-4">
          <p class="text-sm font-semibold text-white">Streaks</p>
          <p class="mt-1 text-sm leading-6 text-slate-400">Make it easy to come back tomorrow.</p>
        </div>
      </div>
    </section>

    <section class="glass-card rounded-[2rem] p-6 sm:p-8">
      <div class="rounded-2xl bg-slate-900/70 p-1">
        <div class="grid grid-cols-2 gap-1">
          <button
            class="rounded-xl px-4 py-2 text-sm font-semibold transition"
            :class="!isRegisterMode ? 'bg-cyan-400 text-slate-950' : 'text-slate-300 hover:bg-slate-800/80'"
            @click="isRegisterMode = false"
          >
            Sign in
          </button>
          <button
            class="rounded-xl px-4 py-2 text-sm font-semibold transition"
            :class="isRegisterMode ? 'bg-cyan-400 text-slate-950' : 'text-slate-300 hover:bg-slate-800/80'"
            @click="isRegisterMode = true"
          >
            Create account
          </button>
        </div>
      </div>

      <form class="mt-6 space-y-4" @submit.prevent="submit">
        <div v-if="isRegisterMode" class="space-y-2">
          <label class="text-sm font-medium text-slate-200" for="name">Name</label>
          <input
            id="name"
            v-model.trim="form.name"
            type="text"
            autocomplete="name"
            class="w-full rounded-2xl border border-slate-700 bg-slate-950/80 px-4 py-3 text-sm text-slate-100 outline-none transition focus:border-cyan-400"
            placeholder="Your name"
          >
        </div>

        <div class="space-y-2">
          <label class="text-sm font-medium text-slate-200" for="email">Email</label>
          <input
            id="email"
            v-model.trim="form.email"
            type="email"
            autocomplete="email"
            class="w-full rounded-2xl border border-slate-700 bg-slate-950/80 px-4 py-3 text-sm text-slate-100 outline-none transition focus:border-cyan-400"
            placeholder="you@example.com"
            required
          >
        </div>

        <div class="space-y-2">
          <label class="text-sm font-medium text-slate-200" for="password">Password</label>
          <div class="relative">
            <input
              id="password"
              v-model.trim="form.password"
              :type="showPassword ? 'text' : 'password'"
              autocomplete="current-password"
              class="w-full rounded-2xl border border-slate-700 bg-slate-950/80 px-4 py-3 pr-12 text-sm text-slate-100 outline-none transition focus:border-cyan-400"
              placeholder="At least 6 characters"
              required
            >
            <button
              type="button"
              class="absolute inset-y-0 right-3 inline-flex items-center justify-center text-slate-400 transition hover:text-slate-200"
              :aria-label="showPassword ? 'Hide password' : 'Show password'"
              @click="showPassword = !showPassword"
            >
              <svg
                v-if="showPassword"
                class="h-5 w-5"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M3 3L21 21" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" />
                <path d="M10.6 10.7C10.2 11.05 10 11.51 10 12C10 13.1 10.9 14 12 14C12.49 14 12.95 13.8 13.3 13.4" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" />
                <path d="M9.4 5.5C10.23 5.18 11.1 5 12 5C16.5 5 20.1 9.1 21 12C20.73 12.87 20.19 13.84 19.42 14.77" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" />
                <path d="M6.1 6.1C3.91 7.58 2.46 9.95 2 12C3 15 6.6 19 12 19C13.66 19 15.16 18.62 16.48 17.98" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" />
              </svg>
              <svg
                v-else
                class="h-5 w-5"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M2 12C3 9 6.6 5 12 5C17.4 5 21 9 22 12C21 15 17.4 19 12 19C6.6 19 3 15 2 12Z" stroke="currentColor" stroke-width="1.8" />
                <circle cx="12" cy="12" r="3" stroke="currentColor" stroke-width="1.8" />
              </svg>
            </button>
          </div>
        </div>

        <p v-if="errorMessage" class="rounded-2xl border border-rose-500/30 bg-rose-500/10 px-4 py-3 text-sm text-rose-200">
          {{ errorMessage }}
        </p>

        <button
          type="submit"
          class="inline-flex w-full items-center justify-center rounded-2xl bg-cyan-400 px-5 py-3 text-sm font-semibold text-slate-950 transition hover:bg-cyan-300 disabled:cursor-not-allowed disabled:opacity-70"
          :disabled="loading"
        >
          {{ loading ? 'Please wait...' : isRegisterMode ? 'Create account' : 'Sign in' }}
        </button>
      </form>
    </section>
  </div>
</template>

<script setup lang="ts">
const route = useRoute()
const router = useRouter()
const { push } = useToast()
const { login, register, loading } = useAuth()

const isRegisterMode = ref(false)
const errorMessage = ref('')
const showPassword = ref(false)
const form = reactive({
  name: '',
  email: '',
  password: ''
})

const targetPath = computed(() => {
  const redirect = route.query.redirect
  return typeof redirect === 'string' && redirect.startsWith('/') ? redirect : '/dashboard'
})

const submit = async () => {
  errorMessage.value = ''

  try {
    if (isRegisterMode.value) {
      await register({
        name: form.name,
        email: form.email,
        password: form.password
      })

      push({
        title: 'Account created',
        message: 'Your SkillXP workspace is ready.',
        tone: 'success'
      })
    } else {
      await login({
        email: form.email,
        password: form.password
      })

      push({
        title: 'Signed in',
        message: 'Welcome back to SkillXP.',
        tone: 'success'
      })
    }

    await router.push(targetPath.value)
  } catch (error) {
    const message = error instanceof Error ? error.message : 'We could not sign you in right now.'
    errorMessage.value =
      message === 'This email is already in use. Try signing in instead.'
        ? 'This email is already registered. Try signing in instead.'
        : message === 'That email or password does not look right.'
          ? 'We could not find a match for that email and password.'
          : message === 'Please enter both your email and password.'
            ? 'Enter your email and password to continue.'
            : message === 'Please enter both an email and a password.'
              ? 'Add an email and password to create your account.'
              : message === 'Choose a password with at least 6 characters.'
                ? 'Your password needs at least 6 characters.'
                : 'Something went wrong. Please try again.'
  }
}

useSeoMeta({
  title: 'SkillXP | Login',
  description: 'Sign in or create a SkillXP account.'
})
</script>
