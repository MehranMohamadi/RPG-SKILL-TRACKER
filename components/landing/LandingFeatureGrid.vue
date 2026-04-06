<template>
  <section class="grid gap-6 xl:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)]">
    <div class="space-y-3">
      <p class="text-sm font-semibold uppercase tracking-[0.2em] text-cyan-300">{{ eyebrow }}</p>
      <h2 class="text-3xl font-extrabold leading-tight text-white sm:text-4xl">
        {{ title }}
      </h2>
      <p class="max-w-xl text-base leading-8 text-slate-300">
        {{ description }}
      </p>
    </div>

    <div class="grid gap-4 md:grid-cols-2">
      <article
        v-for="feature in features"
        :key="feature.title"
        class="glass-card rounded-[1.75rem] p-5"
      >
        <div class="mb-4 inline-flex h-11 w-11 items-center justify-center rounded-2xl bg-cyan-400/10 text-cyan-300">
          <span class="text-lg font-bold">{{ feature.icon }}</span>
        </div>
        <h3 class="text-lg font-semibold text-white">{{ feature.title }}</h3>
        <p class="mt-2 text-sm leading-7 text-slate-400">{{ feature.copy }}</p>
      </article>
    </div>
  </section>
</template>

<script setup lang="ts">
defineProps<{
  eyebrow: string
  title: string
  description: string
  features: ReadonlyArray<{
    readonly icon: string
    readonly title: string
    readonly copy: string
  }>
}>()
</script>
