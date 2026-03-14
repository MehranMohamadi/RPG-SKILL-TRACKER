import type { Skill } from '~/types'

type SkillPayload = {
  name: string
  icon: string
  color: string
  description?: string | null
}

export const useSkillsStore = defineStore('skills', {
  state: () => ({
    skills: [] as Skill[],
    loading: false
  }),
  getters: {
    byId: (state) => (id: string) => state.skills.find((skill) => skill.id === id)
  },
  actions: {
    async fetchSkills() {
      this.loading = true

      try {
        this.skills = await $fetch<Skill[]>('/api/skills')
      } finally {
        this.loading = false
      }
    },
    async createSkill(payload: SkillPayload) {
      const skill = await $fetch<Skill>('/api/skills', {
        method: 'POST',
        body: payload
      })

      this.skills.unshift(skill)
      return skill
    },
    async updateSkill(id: string, payload: Partial<SkillPayload>) {
      const skill = await $fetch<Skill>(`/api/skills/${id}`, {
        method: 'PUT',
        body: payload
      })

      this.skills = this.skills.map((item) =>
        item.id === id ? { ...item, ...skill, activities: skill.activities ?? item.activities } : item
      )
      return skill
    },
    async deleteSkill(id: string) {
      await $fetch(`/api/skills/${id}`, {
        method: 'DELETE'
      })

      this.skills = this.skills.filter((skill) => skill.id !== id)
    },
    patchSkill(skill: Skill) {
      const existing = this.skills.find((item) => item.id === skill.id)
      const exists = Boolean(existing)
      this.skills = exists
        ? this.skills.map((item) =>
            item.id === skill.id
              ? { ...existing, ...skill, activities: skill.activities ?? existing?.activities }
              : item
          )
        : [skill, ...this.skills]
    }
  }
})
