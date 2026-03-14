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

      <div class="block">
        <span class="mb-2 block text-sm font-medium text-slate-300">{{ t('forms.icon') }}</span>
        <button
          type="button"
          class="flex w-full items-center justify-between rounded-2xl border border-slate-700 bg-slate-900/60 px-4 py-3 text-left text-slate-100 outline-none transition hover:border-slate-500 focus:border-blue-500"
          @click="showIconModal = true"
        >
          <span class="flex items-center gap-3">
            <span class="flex h-8 w-8 items-center justify-center rounded-lg bg-slate-800">
              <SkillIcon :name="selectedIconName" />
            </span>
            <span>{{ selectedIconLabel }}</span>
          </span>
          <span class="text-xs text-slate-400">Choose</span>
        </button>
      </div>
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

    <Teleport to="body">
      <div
        v-if="showIconModal"
        class="fixed inset-0 z-[70] flex items-center justify-center bg-slate-950/70 p-4 backdrop-blur-sm"
        @click.self="showIconModal = false"
      >
        <div class="w-full max-w-2xl rounded-3xl border border-slate-700 bg-slate-900 p-5 shadow-2xl">
          <div class="mb-4 flex items-center justify-between gap-3">
            <div>
              <h3 class="text-lg font-semibold text-slate-100">Select Skill Icon</h3>
              <p class="text-sm text-slate-400">Choose an icon from the built-in pack.</p>
            </div>
            <button
              type="button"
              class="rounded-xl border border-slate-700 px-3 py-2 text-sm text-slate-300 transition hover:bg-slate-800"
              @click="showIconModal = false"
            >
              Close
            </button>
          </div>

          <div class="grid max-h-[55vh] grid-cols-3 gap-2 overflow-y-auto pr-1 sm:grid-cols-4 md:grid-cols-5">
            <button
              v-for="item in skillIcons"
              :key="item.name"
              type="button"
              class="rounded-2xl border border-slate-700 bg-slate-800/50 p-3 text-center transition hover:border-blue-400 hover:bg-slate-800"
              :class="form.icon === item.name ? 'border-blue-500 bg-blue-500/15' : ''"
              @click="selectIcon(item.name)"
            >
              <span class="mx-auto mb-2 flex h-9 w-9 items-center justify-center rounded-lg bg-slate-900 text-slate-100">
                <SkillIcon :name="item.name" />
              </span>
              <span class="text-xs text-slate-300">{{ item.label }}</span>
            </button>
          </div>
        </div>
      </div>
    </Teleport>
  </form>
</template>

<script setup lang="ts">
import { isSkillIconName, skillIcons, type SkillIconName } from '~/composables/useSkillIcons'

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
const showIconModal = ref(false)

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

const selectedIconName = computed<SkillIconName>(() =>
  isSkillIconName(form.icon) ? form.icon : 'star'
)
const selectedIconLabel = computed(() => {
  const matched = skillIcons.find((item) => item.name === selectedIconName.value)
  return matched?.label ?? 'Star'
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

const selectIcon = (name: SkillIconName) => {
  form.icon = name
  showIconModal.value = false
}

const submit = () => {
  emit('submit', {
    name: form.name.trim(),
    icon: form.icon.trim(),
    color: form.color,
    description: form.description.trim() || null
  })
}
</script>
