<template>
  <NuxtLink
    :to="`/skills/${skill.id}`"
    class="glass-card glow-border block p-5 transition duration-300 hover:scale-[1.02] hover:border-blue-400/50 hover:shadow-[0_16px_36px_rgba(37,99,235,0.3)]"
  >
    <div class="mb-4 flex items-start justify-between gap-4">
      <div class="flex items-center gap-3">
        <div
          class="flex h-12 w-12 items-center justify-center rounded-2xl text-2xl"
          :style="{ background: `${skill.color}30`, color: '#e2e8f0' }"
        >
          <SkillIcon v-if="isSkillIconName(skill.icon)" :name="skill.icon" />
          <span v-else>{{ skill.icon }}</span>
        </div>
        <div>
          <h3 class="text-base font-semibold text-slate-100">
            {{ skill.name }}
          </h3>
          <p class="text-sm text-slate-400">
            {{ t('common.level') }} {{ n(skill.level) }}
          </p>
        </div>
      </div>
      <span class="rounded-full bg-slate-800/80 px-3 py-1 text-xs font-semibold text-slate-300">
        {{ n(skill.activities?.length ?? 0) }} {{ t('common.activities') }}
      </span>
    </div>

    <p class="mb-4 min-h-10 text-sm text-slate-400">
      {{ skill.description || t('card.defaultSkillDescription') }}
    </p>

    <XpProgressBar
      :current-xp="skill.xp"
      :required-xp="skill.xpToNextLevel"
      :color="skill.color"
      :animated="animated"
    />
  </NuxtLink>
</template>

<script setup lang="ts">
import type { Skill } from '~/types'
import { isSkillIconName } from '~/composables/useSkillIcons'

defineProps<{
  skill: Skill
  animated?: boolean
}>()

const { n, t } = useI18n()
</script>
