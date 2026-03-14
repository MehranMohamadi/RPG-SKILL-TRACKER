<template>
  <div>
    <div class="mb-2 flex items-center justify-between text-xs font-medium text-slate-400">
      <span>{{ t('progress.ratio', { current: n(currentXp), required: n(requiredXp) }) }}</span>
      <span>{{ n(percentage) }}%</span>
    </div>
    <div class="relative h-3 overflow-hidden rounded-full bg-slate-800">
      <div
        class="h-full rounded-full transition-all duration-700 ease-out"
        :class="animated ? 'animate-pulse-glow' : ''"
        :style="{ width: `${percentage}%`, background: `linear-gradient(90deg, ${color}, #2563eb)` }"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
const props = defineProps<{
  currentXp: number
  requiredXp: number
  color: string
  animated?: boolean
}>()
const { n, t } = useI18n()

const percentage = computed(() => {
  if (props.requiredXp <= 0) {
    return 0
  }

  return Math.min(100, Math.round((props.currentXp / props.requiredXp) * 100))
})
</script>
