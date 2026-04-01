<template>
  <form class="space-y-4" @submit.prevent="submit">
    <div class="grid gap-4 sm:grid-cols-2">
      <label class="block sm:col-span-2">
        <span class="mb-2 block text-sm font-medium text-slate-300">{{ t('forms.activityName') }}</span>
        <input
          v-model="form.name"
          class="w-full rounded-2xl border border-slate-700 bg-slate-900/60 px-4 py-3 text-slate-100 outline-none transition focus:border-blue-500"
          :placeholder="t('forms.buildProject')"
          required
        />
      </label>
      <label class="block">
        <span class="mb-2 block text-sm font-medium text-slate-300">{{ t('forms.xpReward') }}</span>
        <input
          v-model.number="form.xpReward"
          type="number"
          min="1"
          class="w-full rounded-2xl border border-slate-700 bg-slate-900/60 px-4 py-3 text-slate-100 outline-none transition focus:border-blue-500"
          required
        />
      </label>
      <label class="block">
        <span class="mb-2 block text-sm font-medium text-slate-300">{{ t('forms.cooldownMinutes') }}</span>
        <input
          v-model.number="form.cooldown"
          type="number"
          min="0"
          class="w-full rounded-2xl border border-slate-700 bg-slate-900/60 px-4 py-3 text-slate-100 outline-none transition focus:border-blue-500"
          :placeholder="t('common.optional')"
        />
      </label>
    </div>

    <label class="block">
      <span class="mb-2 block text-sm font-medium text-slate-300">{{ t('forms.description') }}</span>
      <textarea
        v-model="form.description"
        rows="3"
        class="w-full rounded-2xl border border-slate-700 bg-slate-900/60 px-4 py-3 text-slate-100 outline-none transition focus:border-blue-500"
        :placeholder="t('forms.activityDescriptionPlaceholder')"
      />
    </label>

    <div class="rounded-2xl border border-slate-700/70 bg-slate-900/30 p-4">
      <div class="mb-3 flex items-center justify-between gap-3">
        <div>
          <p class="text-sm font-medium text-slate-200">{{ subActivitiesLabel }}</p>
          <p class="text-xs text-slate-400">{{ subActivitiesHint }}</p>
        </div>
        <button
          type="button"
          class="rounded-xl bg-slate-800 px-3 py-2 text-sm font-medium text-slate-200 transition hover:bg-slate-700"
          @click="addSubActivity"
        >
          {{ addSubActivityLabel }}
        </button>
      </div>

      <div class="space-y-2">
        <div
          v-for="(subActivity, index) in form.subActivities"
          :key="`sub-activity-${index}`"
          class="flex items-center gap-2"
        >
          <input
            v-model="subActivity.name"
            class="w-full rounded-2xl border border-slate-700 bg-slate-900/60 px-4 py-3 text-slate-100 outline-none transition focus:border-blue-500"
            :placeholder="subActivityNamePlaceholder"
          />
          <span class="rounded-full bg-blue-500/15 px-2.5 py-1 text-xs font-semibold text-blue-300">
            +10 XP
          </span>
          <button
            type="button"
            class="rounded-xl bg-rose-500/20 px-3 py-2 text-sm font-medium text-rose-300 transition hover:bg-rose-500/30"
            @click="removeSubActivity(index)"
          >
            {{ removeLabel }}
          </button>
        </div>

        <p v-if="form.subActivities.length === 0" class="text-sm text-slate-500">
          {{ emptySubActivitiesLabel }}
        </p>
      </div>
    </div>

    <button class="rounded-2xl bg-blue-600 px-5 py-3 text-sm font-semibold text-white transition hover:bg-blue-500">
      {{ buttonLabel }}
    </button>
  </form>
</template>

<script setup lang="ts">
const props = withDefaults(
  defineProps<{
    initialValue?: {
      name: string
      xpReward: number
      cooldown?: number | null
      description?: string | null
      subActivities?: Array<{
        name: string
        xpReward: number
      }>
    }
    submitLabel?: string
  }>(),
  {
    initialValue: () => ({
      name: '',
      xpReward: 10,
      cooldown: null,
      description: '',
      subActivities: []
    }),
    submitLabel: undefined
  }
)
const { locale, t } = useI18n()

const emit = defineEmits<{
  submit: [
    payload: {
      name: string
      xpReward: number
      cooldown?: number | null
      description?: string | null
      subActivities?: Array<{
        name: string
        xpReward: number
      }>
    }
  ]
}>()

const form = reactive({
  name: props.initialValue.name,
  xpReward: props.initialValue.xpReward,
  cooldown: props.initialValue.cooldown ?? null,
  description: props.initialValue.description ?? '',
  subActivities: (props.initialValue.subActivities ?? []).map((item) => ({
    name: item.name,
    xpReward: item.xpReward
  }))
})

const buttonLabel = computed(() => props.submitLabel ?? t('forms.saveActivity'))
const subActivitiesLabel = computed(() => (locale.value === 'fa' ? 'زیر اکتیویتی‌ها' : 'Sub activities'))
const subActivitiesHint = computed(() =>
  locale.value === 'fa' ? 'هر زیر اکتیویتی 10 XP می‌دهد.' : 'Each sub activity awards 10 XP.'
)
const addSubActivityLabel = computed(() => (locale.value === 'fa' ? 'افزودن زیر اکتیویتی' : 'Add sub activity'))
const subActivityNamePlaceholder = computed(() => (locale.value === 'fa' ? 'نام زیر اکتیویتی' : 'Sub activity name'))
const removeLabel = computed(() => (locale.value === 'fa' ? 'حذف' : 'Remove'))
const emptySubActivitiesLabel = computed(() =>
  locale.value === 'fa' ? 'هنوز زیر اکتیویتی‌ای اضافه نشده.' : 'No sub activities yet.'
)

watch(
  () => props.initialValue,
  (value) => {
    form.name = value.name
    form.xpReward = value.xpReward
    form.cooldown = value.cooldown ?? null
    form.description = value.description ?? ''
    form.subActivities = (value.subActivities ?? []).map((item) => ({
      name: item.name,
      xpReward: item.xpReward
    }))
  },
  { deep: true }
)

const addSubActivity = () => {
  form.subActivities.push({
    name: '',
    xpReward: 10
  })
}

const removeSubActivity = (index: number) => {
  form.subActivities.splice(index, 1)
}

const submit = () => {
  emit('submit', {
    name: form.name.trim(),
    xpReward: Number(form.xpReward),
    cooldown: form.cooldown || null,
    description: form.description.trim() || null,
    subActivities: form.subActivities
      .map((item) => ({
        name: item.name.trim(),
        xpReward: 10
      }))
      .filter((item) => item.name.length > 0)
  })
}
</script>
