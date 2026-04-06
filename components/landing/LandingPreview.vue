<template>
  <section class="grid gap-6 xl:grid-cols-[minmax(0,1fr)_minmax(320px,0.8fr)]">
    <div class="glass-card overflow-hidden rounded-[2rem] p-6">
      <div class="flex flex-col gap-3 border-b border-slate-800 pb-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p class="text-sm font-semibold uppercase tracking-[0.2em] text-cyan-300">{{ eyebrow }}</p>
          <h2 class="mt-2 text-3xl font-extrabold text-white">{{ title }}</h2>
        </div>
        <p class="max-w-sm text-sm leading-7 text-slate-400">{{ description }}</p>
      </div>

      <div class="mt-6 grid gap-4 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)]">
        <div class="rounded-[1.75rem] border border-slate-800 bg-slate-950/80 p-5">
          <p class="text-sm font-semibold text-white">{{ sideTitle }}</p>
          <ul class="mt-4 space-y-3 text-sm text-slate-300">
            <li
              v-for="point in sidePoints"
              :key="point"
              class="flex gap-3"
            >
              <span class="mt-1 h-2.5 w-2.5 rounded-full bg-cyan-300" />
              <span class="leading-7">{{ point }}</span>
            </li>
          </ul>
        </div>

        <div class="space-y-4">
          <article
            v-for="item in timeline"
            :key="item.title"
            class="rounded-[1.75rem] border border-slate-800 bg-slate-900/70 p-5"
          >
            <div class="flex items-center justify-between gap-3">
              <h3 class="text-base font-semibold text-white">{{ item.title }}</h3>
              <span class="rounded-full bg-blue-500/15 px-3 py-1 text-xs font-semibold text-blue-300">
                {{ item.badge }}
              </span>
            </div>
            <p class="mt-2 text-sm leading-7 text-slate-400">{{ item.copy }}</p>
          </article>
        </div>
      </div>
    </div>

    <div class="glass-card rounded-[2rem] p-6">
      <p class="text-sm font-semibold uppercase tracking-[0.2em] text-cyan-300">{{ ctaEyebrow }}</p>
      <h3 class="mt-3 text-2xl font-extrabold text-white">{{ ctaTitle }}</h3>
      <p class="mt-3 text-sm leading-7 text-slate-400">{{ ctaCopy }}</p>

      <div class="mt-6 space-y-3">
        <NuxtLink
          to="/dashboard"
          class="inline-flex w-full items-center justify-center rounded-2xl bg-white px-5 py-3 text-sm font-semibold text-slate-950 transition hover:bg-slate-200"
        >
          {{ primaryLabel }}
        </NuxtLink>
        <NuxtLink
          to="/skills"
          class="inline-flex w-full items-center justify-center rounded-2xl border border-slate-700 bg-slate-900/60 px-5 py-3 text-sm font-semibold text-slate-100 transition hover:border-slate-500 hover:bg-slate-800/80"
        >
          {{ secondaryLabel }}
        </NuxtLink>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
defineProps<{
  eyebrow: string
  title: string
  description: string
  sideTitle: string
  sidePoints: ReadonlyArray<string>
  timeline: ReadonlyArray<{
    readonly title: string
    readonly copy: string
    readonly badge: string
  }>
  ctaEyebrow: string
  ctaTitle: string
  ctaCopy: string
  primaryLabel: string
  secondaryLabel: string
}>()
</script>
