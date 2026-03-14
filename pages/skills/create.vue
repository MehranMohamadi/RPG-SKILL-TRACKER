<template>
  <div class="mx-auto max-w-3xl">
    <section class="glass-card p-5 sm:p-6">
      <div class="mb-6">
        <h1 class="section-title">Create Skill</h1>
        <p class="section-copy">Define a new area to level up with consistent activities.</p>
      </div>

      <SkillForm submit-label="Create Skill" @submit="createSkill" />
    </section>
  </div>
</template>

<script setup lang="ts">
const skillsStore = useSkillsStore()
const router = useRouter()
const { push } = useToast()

const createSkill = async (payload: {
  name: string
  icon: string
  color: string
  description?: string | null
}) => {
  const skill = await skillsStore.createSkill(payload)

  push({
    title: 'Skill created',
    message: `${skill.name} is ready for XP gains.`,
    tone: 'success'
  })

  await router.push(`/skills/${skill.id}`)
}
</script>
