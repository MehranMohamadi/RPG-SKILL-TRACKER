import type { Skill } from '~/types'

type SkillPayload = {
  name: string
  icon: string
  color: string
  description?: string | null
}

let skillsPendingRequest: Promise<Skill[]> | null = null

export const useSkillsStore = defineStore('skills', {
  state: () => ({
    skills: [] as Skill[],
    loading: false,
    loadedAt: 0
  }),
  getters: {
    byId: (state) => (id: string) => state.skills.find((skill) => skill.id === id)
  },
  actions: {
    async fetchSkills(options?: { force?: boolean }) {
      const force = options?.force ?? false
      const hasCachedSkills = this.skills.length > 0

      if (!force && hasCachedSkills) {
        return this.skills
      }

      if (!force && skillsPendingRequest) {
        return skillsPendingRequest
      }

      this.loading = true

      const request = $fetch<Skill[]>('/api/skills')
        .then((skills) => {
          this.skills = skills
          this.loadedAt = Date.now()
          return skills
        })
        .finally(() => {
          this.loading = false
          skillsPendingRequest = null
        })

      skillsPendingRequest = request
      return request
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
