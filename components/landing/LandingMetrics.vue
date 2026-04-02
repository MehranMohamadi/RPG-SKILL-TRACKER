<template>
  <section class="grid gap-4 md:grid-cols-3">
    <article
      v-for="item in items"
      :key="item.label"
      class="glass-card rounded-[1.75rem] p-5"
    >
      <p class="text-3xl font-extrabold text-white sm:text-4xl">{{ item.value }}</p>
      <p class="mt-2 text-sm font-semibold text-slate-200">{{ item.label }}</p>
      <p class="mt-1 text-sm leading-6 text-slate-400">{{ item.copy }}</p>
    </article>
  </section>
</template>

<script setup lang="ts">
defineProps<{
  items: Array<{
    value: string
    label: string
    copy: string
  }>
}>()
</script>
