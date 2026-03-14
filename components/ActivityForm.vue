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
    }
    submitLabel?: string
  }>(),
  {
    initialValue: () => ({
      name: '',
      xpReward: 10,
      cooldown: null,
      description: ''
    }),
    submitLabel: undefined
  }
)
const { t } = useI18n()

const emit = defineEmits<{
  submit: [
    payload: {
      name: string
      xpReward: number
      cooldown?: number | null
      description?: string | null
    }
  ]
}>()

const form = reactive({
  name: props.initialValue.name,
  xpReward: props.initialValue.xpReward,
  cooldown: props.initialValue.cooldown ?? null,
  description: props.initialValue.description ?? ''
})

const buttonLabel = computed(() => props.submitLabel ?? t('forms.saveActivity'))

watch(
  () => props.initialValue,
  (value) => {
    form.name = value.name
    form.xpReward = value.xpReward
    form.cooldown = value.cooldown ?? null
    form.description = value.description ?? ''
  },
  { deep: true }
)

const submit = () => {
  emit('submit', {
    name: form.name.trim(),
    xpReward: Number(form.xpReward),
    cooldown: form.cooldown || null,
    description: form.description.trim() || null
  })
}
</script>
