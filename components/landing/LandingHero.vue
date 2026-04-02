<template>
  <section class="relative overflow-hidden rounded-[2rem] border border-slate-800/80 bg-slate-950/75 px-6 py-8 shadow-2xl shadow-slate-950/30 sm:px-8 sm:py-10 lg:px-10 lg:py-12">
    <div class="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(14,165,233,0.2),transparent_28rem),radial-gradient(circle_at_bottom_right,rgba(37,99,235,0.2),transparent_24rem)]" />
    <div class="absolute right-0 top-0 h-40 w-40 -translate-y-10 translate-x-10 rounded-full bg-cyan-400/10 blur-3xl" />

    <div class="relative grid gap-8 lg:grid-cols-[minmax(0,1.15fr)_minmax(280px,0.85fr)] lg:items-center">
      <div class="space-y-6">
        <div class="inline-flex items-center gap-2 rounded-full border border-cyan-400/30 bg-cyan-400/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.22em] text-cyan-200">
          <span class="h-2 w-2 rounded-full bg-cyan-300" />
          {{ badge }}
        </div>

        <div class="max-w-3xl space-y-4">
          <h1 class="text-4xl font-extrabold leading-tight text-white sm:text-5xl lg:text-6xl">
            {{ title }}
          </h1>
          <p class="max-w-2xl text-base leading-8 text-slate-300 sm:text-lg">
            {{ description }}
          </p>
        </div>

        <div class="flex flex-col gap-3 sm:flex-row">
          <NuxtLink
            to="/dashboard"
            class="inline-flex items-center justify-center rounded-2xl bg-cyan-400 px-6 py-3 text-sm font-semibold text-slate-950 transition hover:bg-cyan-300"
          >
            {{ primaryCta }}
          </NuxtLink>
          <NuxtLink
            to="/skills/create"
            class="inline-flex items-center justify-center rounded-2xl border border-slate-700 bg-slate-900/70 px-6 py-3 text-sm font-semibold text-slate-100 transition hover:border-slate-500 hover:bg-slate-800/90"
          >
            {{ secondaryCta }}
          </NuxtLink>
        </div>

        <div class="grid gap-3 sm:grid-cols-3">
          <div
            v-for="item in highlights"
            :key="item.title"
            class="rounded-2xl border border-slate-800/80 bg-slate-900/60 p-4"
          >
            <p class="text-sm font-semibold text-white">{{ item.title }}</p>
            <p class="mt-1 text-sm leading-6 text-slate-400">{{ item.copy }}</p>
          </div>
        </div>
      </div>

      <div class="relative">
        <div class="absolute -inset-4 rounded-[2rem] bg-gradient-to-br from-cyan-400/20 via-transparent to-blue-500/10 blur-2xl" />
        <div class="relative overflow-hidden rounded-[2rem] border border-slate-800/80 bg-slate-900/80 p-5">
          <div class="flex items-center justify-between border-b border-slate-800 pb-4">
            <div>
              <p class="text-sm font-semibold text-white">{{ previewTitle }}</p>
              <p class="text-xs text-slate-400">{{ previewSubtitle }}</p>
            </div>
            <span class="rounded-full bg-emerald-400/15 px-3 py-1 text-xs font-semibold text-emerald-300">
              +120 XP
            </span>
          </div>

          <div class="mt-5 space-y-4">
            <div
              v-for="card in previewCards"
              :key="card.name"
              class="rounded-2xl border border-slate-800 bg-slate-950/80 p-4"
            >
              <div class="flex items-start justify-between gap-4">
                <div>
                  <p class="text-sm font-semibold text-white">{{ card.name }}</p>
                  <p class="mt-1 text-xs text-slate-400">{{ card.copy }}</p>
                </div>
                <span class="rounded-full px-3 py-1 text-xs font-semibold" :class="card.badgeClass">
                  {{ card.badge }}
                </span>
              </div>
              <div class="mt-4 h-2 overflow-hidden rounded-full bg-slate-800">
                <div class="h-full rounded-full bg-gradient-to-r from-cyan-400 to-blue-500" :style="{ width: card.progress }" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
interface HeroHighlight {
  title: string
  copy: string
}

interface HeroPreviewCard {
  name: string
  copy: string
  badge: string
  badgeClass: string
  progress: string
}

defineProps<{
  badge: string
  title: string
  description: string
  primaryCta: string
  secondaryCta: string
  previewTitle: string
  previewSubtitle: string
  highlights: HeroHighlight[]
  previewCards: HeroPreviewCard[]
}>()
</script>
