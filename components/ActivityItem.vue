<template>
  <div class="rounded-2xl border border-slate-700/70 bg-slate-900/40 p-4 transition hover:border-slate-500">
    <div class="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
      <div class="space-y-2">
        <div class="flex flex-wrap items-center gap-2">
          <h4 class="font-semibold text-slate-100">
            {{ activity.name }}
          </h4>
          <span class="rounded-full bg-blue-500/15 px-2.5 py-1 text-xs font-semibold text-blue-300">
            +{{ n(activity.xpReward) }} {{ t('common.xp') }}
          </span>
          <span
            v-if="activity.cooldown"
            class="rounded-full bg-slate-800 px-2.5 py-1 text-xs font-medium text-slate-400"
          >
            {{ t('activities.cooldown', { minutes: n(activity.cooldown) }) }}
          </span>
        </div>
        <p class="text-sm text-slate-400">
          {{ activity.description || t('activities.fallbackDescription') }}
        </p>

        <div
          v-if="activity.subActivities.length > 0"
          class="mt-4 space-y-2 rounded-2xl border border-slate-700/70 bg-slate-950/40 p-3"
        >
          <div class="flex items-center justify-between gap-3">
            <p class="text-sm font-medium text-slate-200">{{ subActivitiesLabel }}</p>
            <span class="text-xs text-slate-500">{{ activity.subActivities.length }} {{ itemsLabel }}</span>
          </div>

          <div
            v-for="subActivity in activity.subActivities"
            :key="subActivity.id"
            class="flex items-center justify-between gap-3 rounded-2xl border border-slate-800 bg-slate-900/60 px-3 py-2"
          >
            <div class="min-w-0">
              <p class="truncate text-sm font-medium text-slate-100">
                {{ subActivity.name }}
              </p>
              <p class="text-xs text-slate-400">+{{ n(subActivity.xpReward) }} XP</p>
            </div>

            <button
              class="rounded-xl bg-blue-600 px-3 py-2 text-sm font-medium text-white transition hover:bg-blue-500"
              @click="completeSubActivity(subActivity.id)"
            >
              {{ t('activities.complete') }}
            </button>
          </div>
        </div>
      </div>

      <div class="relative flex flex-wrap gap-2">
        <Transition name="xp-pop">
          <div
            v-if="showXpPop"
            class="pointer-events-none absolute -top-7 right-0 rounded-full bg-emerald-500/20 px-2 py-1 text-xs font-semibold text-emerald-300"
          >
            +{{ n(xpPopValue) }} XP
          </div>
        </Transition>

        <button
          v-if="activity.subActivities.length === 0"
          class="rounded-xl bg-blue-600 px-4 py-2 text-sm font-medium text-white transition hover:bg-blue-500"
          @click="complete"
        >
          {{ t('activities.complete') }}
        </button>
        <button
          class="rounded-xl bg-slate-800 px-4 py-2 text-sm font-medium text-slate-200 transition hover:bg-slate-700"
          @click="$emit('edit', activity)"
        >
          {{ t('activities.edit') }}
        </button>
        <button
          class="rounded-xl bg-rose-500/20 px-4 py-2 text-sm font-medium text-rose-300 transition hover:bg-rose-500/30"
          @click="$emit('delete', activity.id)"
        >
          {{ t('skills.delete') }}
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { Activity } from '~/types'

const props = defineProps<{
  activity: Activity
}>()
const { activity } = toRefs(props)

const emit = defineEmits<{
  complete: [payload: { activityId?: string; subActivityId?: string }]
  edit: [activity: Activity]
  delete: [activityId: string]
}>()

const { locale, n, t } = useI18n()
const showXpPop = ref(false)
const xpPopValue = ref(props.activity.xpReward)
const subActivitiesLabel = computed(() => (locale.value === 'fa' ? 'زیر اکتیویتی‌ها' : 'Sub activities'))
const itemsLabel = computed(() => (locale.value === 'fa' ? 'مورد' : 'items'))

const complete = () => {
  xpPopValue.value = props.activity.xpReward
  showXpPop.value = true
  setTimeout(() => {
    showXpPop.value = false
  }, 700)

  emit('complete', {
    activityId: props.activity.id
  })
}

const completeSubActivity = (subActivityId: string) => {
  const subActivity = props.activity.subActivities.find((item) => item.id === subActivityId)
  xpPopValue.value = subActivity?.xpReward ?? 10
  showXpPop.value = true
  setTimeout(() => {
    showXpPop.value = false
  }, 700)

  emit('complete', {
    activityId: props.activity.id,
    subActivityId
  })
}
</script>
