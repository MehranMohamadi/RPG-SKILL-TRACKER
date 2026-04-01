export interface Skill {
  id: string
  userId: string
  name: string
  icon: string
  color: string
  description: string | null
  level: number
  xp: number
  xpToNextLevel: number
  createdAt: string
  updatedAt: string
  activities?: Activity[]
}

export interface Activity {
  id: string
  skillId: string
  name: string
  description: string | null
  xpReward: number
  cooldown: number | null
  subActivities: SubActivity[]
  createdAt: string
  updatedAt: string
}

export interface SubActivity {
  id: string
  activityId: string
  name: string
  xpReward: number
  sortOrder: number
  createdAt: string
  updatedAt: string
}

export interface ActivityLog {
  id: string
  userId: string
  activityId: string
  subActivityId: string | null
  xpEarned: number
  completedAt: string
  createdAt: string
  activity?: Activity & {
    skill?: Skill
  }
  subActivity?: SubActivity | null
}

export interface Achievement {
  id: string
  key: string
  title: string
  description: string
  icon: string
  xpReward: number
  createdAt: string
}

export interface UserAchievement {
  id: string
  userId: string
  achievementId: string
  unlockedAt: string
  achievement: Achievement
}

export interface AchievementDefinition {
  key: string
  title: string
  description: string
  icon: string
  category: 'beginner' | 'consistency' | 'xp' | 'skill' | 'activity' | 'explorer'
  target: number
}

export interface AchievementProgress extends AchievementDefinition {
  current: number
  progress: number
  unlocked: boolean
  unlockedAt?: string | null
  image?: string
}

export interface DashboardStats {
  totalXp: number
  userLevel: number
  skillsCount: number
  activitiesCompletedToday: number
}

export interface CompleteActivityResponse {
  skill: Skill
  activityLog: ActivityLog
  leveledUp: boolean
  unlockedAchievements: UserAchievement[]
}
