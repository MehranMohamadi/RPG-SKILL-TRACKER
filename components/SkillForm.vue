<template>
  <form class="space-y-4" @submit.prevent="submit">
    <div class="grid gap-4 sm:grid-cols-2">
      <label class="block">
        <span class="mb-2 block text-sm font-medium text-slate-300">{{ t('forms.skillName') }}</span>
        <input
          v-model="form.name"
          class="w-full rounded-2xl border border-slate-700 bg-slate-900/60 px-4 py-3 text-slate-100 outline-none transition focus:border-blue-500"
          :placeholder="t('forms.programming')"
          required
        />
      </label>
      <label class="block">
        <span class="mb-2 block text-sm font-medium text-slate-300">{{ t('forms.icon') }}</span>
        <input
          v-model="form.icon"
          class="w-full rounded-2xl border border-slate-700 bg-slate-900/60 px-4 py-3 text-slate-100 outline-none transition focus:border-blue-500"
          placeholder="code"
          required
        />
      </label>
    </div>

    <label class="block">
      <span class="mb-2 block text-sm font-medium text-slate-300">{{ t('forms.description') }}</span>
      <textarea
        v-model="form.description"
        rows="3"
        class="w-full rounded-2xl border border-slate-700 bg-slate-900/60 px-4 py-3 text-slate-100 outline-none transition focus:border-blue-500"
        :placeholder="t('forms.skillDescriptionPlaceholder')"
      />
    </label>

    <label class="block">
      <span class="mb-2 block text-sm font-medium text-slate-300">{{ t('forms.accentColor') }}</span>
      <input
        v-model="form.color"
        type="color"
        class="h-12 w-full rounded-2xl border border-slate-700 bg-slate-900/60 px-2 py-2"
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
      icon: string
      color: string
      description?: string | null
    }
    submitLabel?: string
  }>(),
  {
    initialValue: () => ({
      name: '',
      icon: 'star',
      color: '#4f46e5',
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
      icon: string
      color: string
      description?: string | null
    }
  ]
}>()

const form = reactive({
  name: props.initialValue.name,
  icon: props.initialValue.icon,
  color: props.initialValue.color,
  description: props.initialValue.description ?? ''
})

const buttonLabel = computed(() => props.submitLabel ?? t('forms.saveSkill'))

watch(
  () => props.initialValue,
  (value) => {
    form.name = value.name
    form.icon = value.icon
    form.color = value.color
    form.description = value.description ?? ''
  },
  { deep: true }
)

const submit = () => {
  emit('submit', {
    name: form.name.trim(),
    icon: form.icon.trim(),
    color: form.color,
    description: form.description.trim() || null
  })
}
</script>
