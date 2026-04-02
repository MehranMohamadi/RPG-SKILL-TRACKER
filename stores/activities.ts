import type { Activity } from '~/types'
import { useSkillsStore } from './skills'

type ActivityPayload = {
  skillId: string
  name: string
  description?: string | null
  xpReward: number
  cooldown?: number | null
  subActivities?: Array<{
    name: string
    xpReward: number
  }>
}

const activitiesPendingBySkill: Record<string, Promise<Activity[]> | null> = {}

export const useActivitiesStore = defineStore('activities', {
  state: () => ({
    itemsBySkill: {} as Record<string, Activity[]>,
    loading: false
  }),
  getters: {
    forSkill: (state) => (skillId: string) => state.itemsBySkill[skillId] ?? []
  },
  actions: {
    async fetchBySkill(skillId: string, options?: { force?: boolean }) {
      const force = options?.force ?? false

      if (!force && this.itemsBySkill[skillId]) {
        return this.itemsBySkill[skillId]
      }

      if (!force && activitiesPendingBySkill[skillId]) {
        return activitiesPendingBySkill[skillId] as Promise<Activity[]>
      }

      this.loading = true

      const request = $fetch<Activity[]>(`/api/skills/${skillId}/activities`)
        .then((activities) => {
          this.itemsBySkill[skillId] = activities
          const skillsStore = useSkillsStore()
          const skill = skillsStore.byId(skillId)

          if (skill) {
            skillsStore.patchSkill({
              ...skill,
              activities
            })
          }

          return activities
        })
        .finally(() => {
          this.loading = false
          activitiesPendingBySkill[skillId] = null
        })

      activitiesPendingBySkill[skillId] = request
      return request
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
