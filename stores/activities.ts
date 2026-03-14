import type { Activity } from '~/types'
import { useSkillsStore } from './skills'

type ActivityPayload = {
  skillId: string
  name: string
  description?: string | null
  xpReward: number
  cooldown?: number | null
}

export const useActivitiesStore = defineStore('activities', {
  state: () => ({
    itemsBySkill: {} as Record<string, Activity[]>,
    loading: false
  }),
  getters: {
    forSkill: (state) => (skillId: string) => state.itemsBySkill[skillId] ?? []
  },
  actions: {
    async fetchBySkill(skillId: string) {
      this.loading = true

      try {
        this.itemsBySkill[skillId] = await $fetch<Activity[]>(`/api/skills/${skillId}/activities`)
        const skillsStore = useSkillsStore()
        const skill = skillsStore.byId(skillId)

        if (skill) {
          skillsStore.patchSkill({
            ...skill,
            activities: this.itemsBySkill[skillId]
          })
        }
      } finally {
        this.loading = false
      }
    },
    async createActivity(payload: ActivityPayload) {
      const activity = await $fetch<Activity>('/api/activities', {
        method: 'POST',
        body: payload
      })

      this.itemsBySkill[payload.skillId] = [activity, ...(this.itemsBySkill[payload.skillId] ?? [])]
      const skillsStore = useSkillsStore()
      const skill = skillsStore.byId(payload.skillId)

      if (skill) {
        skillsStore.patchSkill({
          ...skill,
          activities: this.itemsBySkill[payload.skillId]
        })
      }

      return activity
    },
    async updateActivity(id: string, skillId: string, payload: Partial<Omit<ActivityPayload, 'skillId'>>) {
      const activity = await $fetch<Activity>(`/api/activities/${id}`, {
        method: 'PUT',
        body: payload
      })

      this.itemsBySkill[skillId] = (this.itemsBySkill[skillId] ?? []).map((item) =>
        item.id === id ? activity : item
      )
      const skillsStore = useSkillsStore()
      const skill = skillsStore.byId(skillId)

      if (skill) {
        skillsStore.patchSkill({
          ...skill,
          activities: this.itemsBySkill[skillId]
        })
      }

      return activity
    },
    async deleteActivity(id: string, skillId: string) {
      await $fetch(`/api/activities/${id}`, {
        method: 'DELETE'
      })

      this.itemsBySkill[skillId] = (this.itemsBySkill[skillId] ?? []).filter((item) => item.id !== id)
      const skillsStore = useSkillsStore()
      const skill = skillsStore.byId(skillId)

      if (skill) {
        skillsStore.patchSkill({
          ...skill,
          activities: this.itemsBySkill[skillId]
        })
      }
    }
  }
})
