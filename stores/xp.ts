import type {
  ActivityLog,
  CompleteActivityResponse,
  DashboardStats,
  UserAchievement
} from '~/types'
import { useSkillsStore } from './skills'

let dashboardPendingRequest: Promise<void> | null = null

export const useXpStore = defineStore('xp', {
  state: () => ({
    stats: null as DashboardStats | null,
    activityLogs: [] as ActivityLog[],
    achievements: [] as UserAchievement[],
    loading: false,
    loadedAt: 0
  }),
  actions: {
    async fetchDashboard(options?: { force?: boolean }) {
      const force = options?.force ?? false
      const hasCachedDashboard = this.stats !== null || this.activityLogs.length > 0 || this.achievements.length > 0

      if (!force && hasCachedDashboard) {
        return
      }

      if (!force && dashboardPendingRequest) {
        return dashboardPendingRequest
      }

      const request = Promise.all([
        $fetch<DashboardStats>('/api/dashboard'),
        $fetch<ActivityLog[]>('/api/activity-log'),
        $fetch<UserAchievement[]>('/api/achievements')
      ])
        .then(([stats, activityLogs, achievements]) => {
          this.stats = stats
          this.activityLogs = activityLogs
          this.achievements = achievements
          this.loadedAt = Date.now()
        })
        .finally(() => {
          dashboardPendingRequest = null
        })

      dashboardPendingRequest = request
      return request
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

        await this.fetchDashboard({ force: true })
        return response
      } finally {
        this.loading = false
      }
    }
  }
})
