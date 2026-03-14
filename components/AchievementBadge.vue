<template>
  <div
    class="rounded-2xl border p-4 transition-all duration-300"
    :class="
      unlocked
        ? 'border-blue-400/40 bg-blue-500/10 shadow-[0_8px_28px_rgba(37,99,235,0.25)]'
        : 'border-slate-700/70 bg-slate-900/40'
    "
  >
    <div class="flex items-start gap-3">
      <div
        class="flex h-11 w-11 items-center justify-center rounded-2xl text-sm font-bold"
        :class="unlocked ? 'bg-blue-500/20 text-blue-200' : 'bg-slate-800 text-slate-300'"
      >
        {{ icon }}
      </div>
      <div class="flex-1">
        <div class="mb-1 flex items-center justify-between gap-3">
          <p class="text-sm font-semibold text-slate-100">
            {{ title }}
          </p>
          <span
            class="rounded-full px-2.5 py-1 text-[11px] font-semibold tracking-wide"
            :class="unlocked ? 'bg-emerald-500/20 text-emerald-300' : 'bg-slate-700 text-slate-300'"
          >
            {{ unlocked ? t('common.unlocked') : `${progress}%` }}
          </span>
        </div>
        <p class="text-sm text-slate-400">
          {{ description }}
        </p>
        <p v-if="unlockedAt" class="mt-2 text-xs text-slate-500">
          {{ formatDate(unlockedAt) }}
        </p>
        <div v-if="!unlocked" class="mt-3 h-2 overflow-hidden rounded-full bg-slate-800">
          <div class="h-full rounded-full bg-blue-500 transition-all duration-500" :style="{ width: `${progress}%` }" />
        </div>
        <p v-if="!unlocked" class="mt-2 text-xs text-slate-500">
          {{ current }} / {{ target }}
        </p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
withDefaults(
  defineProps<{
    icon: string
    title: string
    description: string
    unlocked?: boolean
    progress?: number
    current?: number
    target?: number
    unlockedAt?: string | null
  }>(),
  {
    unlocked: false,
    progress: 0,
    current: 0,
    target: 0,
    unlockedAt: null
  }
)
const { d, t } = useI18n()

const formatDate = (value: string) => d(value)
</script>
