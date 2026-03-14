<template>
  <div class="space-y-6">
    <section class="glass-card p-5">
      <div class="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 class="section-title">Skills</h1>
          <p class="section-copy">Manage your skill tree and keep each track focused.</p>
        </div>
        <NuxtLink
          to="/skills/create"
          class="rounded-2xl bg-blue-600 px-4 py-2 text-sm font-medium text-white transition hover:bg-blue-500"
        >
          Create Skill
        </NuxtLink>
      </div>
    </section>

    <section class="grid gap-4 lg:grid-cols-2">
      <div v-for="skill in skillsStore.skills" :key="skill.id" class="glass-card p-5">
        <div class="mb-4 flex items-start justify-between gap-4">
          <div class="flex items-center gap-3">
            <div
              class="flex h-12 w-12 items-center justify-center rounded-2xl text-2xl"
              :style="{ background: `${skill.color}25` }"
            >
              <SkillIcon v-if="isSkillIconName(skill.icon)" :name="skill.icon" />
              <span v-else>{{ skill.icon }}</span>
            </div>
            <div>
              <h2 class="font-semibold text-slate-100">
                {{ skill.name }}
              </h2>
              <p class="text-sm text-slate-400">
                Level {{ skill.level }}
              </p>
            </div>
          </div>

          <div class="flex gap-2">
            <NuxtLink
              :to="`/skills/${skill.id}`"
              class="rounded-xl bg-slate-800 px-4 py-2 text-sm font-medium text-slate-200 transition hover:bg-slate-700"
            >
              Open
            </NuxtLink>
            <button
              class="rounded-xl bg-rose-500/20 px-4 py-2 text-sm font-medium text-rose-300 transition hover:bg-rose-500/30"
              @click="remove(skill.id)"
            >
              Delete
            </button>
          </div>
        </div>

        <p class="mb-4 text-sm text-slate-400">
          {{ skill.description || 'A steady track for long-term progression.' }}
        </p>

        <XpProgressBar :current-xp="skill.xp" :required-xp="skill.xpToNextLevel" :color="skill.color" />
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
import { isSkillIconName } from '~/composables/useSkillIcons'

const skillsStore = useSkillsStore()
const { push } = useToast()

await skillsStore.fetchSkills()

const remove = async (id: string) => {
  await skillsStore.deleteSkill(id)
  push({
    title: 'Skill removed',
    message: 'The skill and its activities have been deleted.',
    tone: 'info'
  })
}
</script>
