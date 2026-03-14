<template>
  <div class="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
    <div
      v-for="card in cards"
      :key="card.label"
      class="glass-card glow-border p-5 transition duration-300 hover:scale-[1.01] hover:border-blue-400/40"
    >
      <p class="text-sm text-slate-400">
        {{ card.label }}
      </p>
      <p class="mt-3 text-3xl font-semibold tracking-tight text-slate-100">
        {{ card.value }}
      </p>
      <p class="mt-2 text-sm text-slate-400">
        {{ card.copy }}
      </p>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { DashboardStats as DashboardStatsType } from '~/types'

const props = defineProps<{
  stats: DashboardStatsType | null
  currentStreak?: number
  longestStreak?: number
}>()
const { n } = useI18n()

const cards = computed(() => [
  {
    label: 'Total XP',
    value: n(props.stats?.totalXp ?? 0),
    copy: 'Every completed activity compounds your growth.'
  },
  {
    label: 'User Level',
    value: n(props.stats?.userLevel ?? 1),
    copy: 'Overall momentum across all your active skills.'
  },
  {
    label: 'Active Skills',
    value: n(props.stats?.skillsCount ?? 0),
    copy: 'Disciplines you are consistently leveling up.'
  },
  {
    label: 'Streak',
    value: `${n(props.currentStreak ?? 0)}d`,
    copy: `Best streak: ${n(props.longestStreak ?? 0)}d`
  }
])
</script>
