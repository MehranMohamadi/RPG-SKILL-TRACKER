import type {
  ActivityLog,
  CompleteActivityResponse,
  DashboardStats,
  UserAchievement
} from '~/types'
import { useSkillsStore } from './skills'

export const useXpStore = defineStore('xp', {
  state: () => ({
    stats: null as DashboardStats | null,
    activityLogs: [] as ActivityLog[],
    achievements: [] as UserAchievement[],
    loading: false
  }),
  actions: {
    async fetchDashboard() {
      const [stats, activityLogs, achievements] = await Promise.all([
        $fetch<DashboardStats>('/api/dashboard'),
        $fetch<ActivityLog[]>('/api/activity-log'),
        $fetch<UserAchievement[]>('/api/achievements')
      ])

      this.stats = stats
      this.activityLogs = activityLogs
      this.achievements = achievements
    },
    async completeActivity(payload: { activityId?: string; subActivityId?: string }) {
      this.loading = true

      try {
        const response = await $fetch<CompleteActivityResponse>('/api/activity-log', {
          method: 'POST',
          body: payload
        })

        const skillsStore = useSkillsStore()
        skillsStore.patchSkill(response.skill)
        this.activityLogs = [response.activityLog, ...this.activityLogs]

        if (response.unlockedAchievements.length) {
          this.achievements = [...response.unlockedAchievements, ...this.achievements]
        }

        await this.fetchDashboard()
        return response
      } finally {
        this.loading = false
      }
    }
  }
})
