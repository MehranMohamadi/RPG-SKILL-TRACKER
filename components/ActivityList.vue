<template>
  <div class="space-y-3">
    <ActivityItem
      v-for="activity in activities"
      :key="activity.id"
      :activity="activity"
      @complete="$emit('complete', $event)"
      @edit="$emit('edit', $event)"
      @delete="$emit('delete', $event)"
    />
    <div
      v-if="activities.length === 0"
      class="rounded-2xl border border-dashed border-slate-700 p-6 text-sm text-slate-400"
    >
      {{ t('activities.emptyList') }}
    </div>
  </div>
</template>

<script setup lang="ts">
import type { Activity } from '~/types'

defineProps<{
  activities: Activity[]
}>()
const { t } = useI18n()

defineEmits<{
  complete: [activityId: string]
  edit: [activity: Activity]
  delete: [activityId: string]
}>()
</script>
