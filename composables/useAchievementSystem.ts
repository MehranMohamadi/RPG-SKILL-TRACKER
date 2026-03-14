import type { AchievementProgress, ActivityLog, Skill, UserAchievement } from '~/types'
import type { Ref } from 'vue'

const ACHIEVEMENT_DEFINITIONS: Omit<AchievementProgress, 'current' | 'progress' | 'unlocked' | 'unlockedAt'>[] = [
  {
    key: 'first_activity',
    title: 'First Step',
    description: 'Complete your first activity.',
    icon: 'FS',
    category: 'beginner',
    target: 1
  },
  {
    key: 'streak_3',
    title: '3 Day Streak',
    description: 'Complete activities for 3 consecutive days.',
    icon: 'S3',
    category: 'consistency',
    target: 3
  },
  {
    key: 'streak_7',
    title: '7 Day Streak',
    description: 'Complete activities for 7 consecutive days.',
    icon: 'S7',
    category: 'consistency',
    target: 7
  },
  {
    key: 'streak_30',
    title: '30 Day Streak',
    description: 'Complete activities for 30 consecutive days.',
    icon: 'S30',
    category: 'consistency',
    target: 30
  },
  {
    key: 'xp_100',
    title: '100 XP',
    description: 'Earn 100 total XP.',
    icon: 'X1',
    category: 'xp',
    target: 100
  },
  {
    key: 'earn_500_xp',
    title: '500 XP',
    description: 'Earn 500 total XP.',
    icon: 'X5',
    category: 'xp',
    target: 500
  },
  {
    key: 'xp_1000',
    title: '1000 XP',
    description: 'Earn 1,000 total XP.',
    icon: 'X10',
    category: 'xp',
    target: 1000
  },
  {
    key: 'xp_5000',
    title: '5000 XP',
    description: 'Earn 5,000 total XP.',
    icon: 'X50',
    category: 'xp',
    target: 5000
  },
  {
    key: 'skill_level_5',
    title: 'Level 5 Skill',
    description: 'Reach level 5 in any skill.',
    icon: 'L5',
    category: 'skill',
    target: 5
  },
  {
    key: 'skill_level_10',
    title: 'Level 10 Skill',
    description: 'Reach level 10 in any skill.',
    icon: 'L10',
    category: 'skill',
    target: 10
  },
  {
    key: 'master_skill_20',
    title: 'Master a Skill',
    description: 'Reach level 20 in any skill.',
    icon: 'M20',
    category: 'skill',
    target: 20
  },
  {
    key: 'activities_10',
    title: '10 Activities',
    description: 'Complete 10 activities.',
    icon: 'A10',
    category: 'activity',
    target: 10
  },
  {
    key: 'activities_50',
    title: '50 Activities',
    description: 'Complete 50 activities.',
    icon: 'A50',
    category: 'activity',
    target: 50
  },
  {
    key: 'activities_100',
    title: '100 Activities',
    description: 'Complete 100 activities.',
    icon: 'A100',
    category: 'activity',
    target: 100
  },
  {
    key: 'skills_3',
    title: 'Explorer 3',
    description: 'Create 3 skills.',
    icon: 'E3',
    category: 'explorer',
    target: 3
  },
  {
    key: 'skills_5',
    title: 'Explorer 5',
    description: 'Create 5 skills.',
    icon: 'E5',
    category: 'explorer',
    target: 5
  },
  {
    key: 'skills_10',
    title: 'Explorer 10',
    description: 'Create 10 skills.',
    icon: 'E10',
    category: 'explorer',
    target: 10
  }
]

const toDayKey = (value: string) => {
  const date = new Date(value)
  return `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`
}

const buildStreakMetrics = (logs: ActivityLog[]) => {
  const uniqueDayKeys = Array.from(new Set(logs.map((log) => toDayKey(log.completedAt))))
    .map((value) => new Date(value))
    .sort((a, b) => a.getTime() - b.getTime())

  if (uniqueDayKeys.length === 0) {
    return {
      current: 0,
      longest: 0
    }
  }

  let longest = 1
  let running = 1

  for (let index = 1; index < uniqueDayKeys.length; index += 1) {
    const prev = uniqueDayKeys[index - 1]
    const next = uniqueDayKeys[index]
    const diffDays = Math.round((next.getTime() - prev.getTime()) / (1000 * 60 * 60 * 24))

    if (diffDays === 1) {
      running += 1
      longest = Math.max(longest, running)
    } else {
      running = 1
    }
  }

  let current = 1
  for (let index = uniqueDayKeys.length - 1; index > 0; index -= 1) {
    const next = uniqueDayKeys[index]
    const prev = uniqueDayKeys[index - 1]
    const diffDays = Math.round((next.getTime() - prev.getTime()) / (1000 * 60 * 60 * 24))
    if (diffDays === 1) {
      current += 1
    } else {
      break
    }
  }

  const today = new Date()
  today.setHours(0, 0, 0, 0)
  const last = new Date(uniqueDayKeys[uniqueDayKeys.length - 1])
  last.setHours(0, 0, 0, 0)
  const distanceToToday = Math.round((today.getTime() - last.getTime()) / (1000 * 60 * 60 * 24))

  if (distanceToToday > 1) {
    current = 0
  }

  return {
    current,
    longest
  }
}

const resolveCurrentValue = (
  definition: (typeof ACHIEVEMENT_DEFINITIONS)[number],
  input: {
    totalXp: number
    activityCount: number
    skillsCount: number
    maxSkillLevel: number
    longestStreak: number
  }
) => {
  if (definition.category === 'xp') {
    return input.totalXp
  }

  if (definition.category === 'activity' || definition.category === 'beginner') {
    return input.activityCount
  }

  if (definition.category === 'explorer') {
    return input.skillsCount
  }

  if (definition.category === 'skill') {
    return input.maxSkillLevel
  }

  return input.longestStreak
}

export const useAchievementSystem = (payload: {
  achievements: Ref<UserAchievement[]>
  logs: Ref<ActivityLog[]>
  skills: Ref<Skill[]>
  totalXp: Ref<number>
}) => {
  const unlockedByKey = computed(() => {
    const map = new Map<string, UserAchievement>()
    for (const item of payload.achievements.value) {
      map.set(item.achievement.key, item)
    }
    return map
  })

  const streak = computed(() => buildStreakMetrics(payload.logs.value))

  const activityCount = computed(() => payload.logs.value.length)
  const skillsCount = computed(() => payload.skills.value.length)
  const maxSkillLevel = computed(() =>
    payload.skills.value.reduce((max, skill) => Math.max(max, skill.level), 1)
  )

  const progress = computed<AchievementProgress[]>(() =>
    ACHIEVEMENT_DEFINITIONS.map((definition) => {
      const unlockedItem = unlockedByKey.value.get(definition.key)
      const current = resolveCurrentValue(definition, {
        totalXp: payload.totalXp.value,
        activityCount: activityCount.value,
        skillsCount: skillsCount.value,
        maxSkillLevel: maxSkillLevel.value,
        longestStreak: streak.value.longest
      })
      const unlocked = Boolean(unlockedItem) || current >= definition.target

      return {
        ...definition,
        current,
        progress: Math.min(100, Math.round((Math.min(current, definition.target) / definition.target) * 100)),
        unlocked,
        unlockedAt: unlockedItem?.unlockedAt ?? null
      }
    })
  )

  return {
    progress,
    streak,
    categories: computed(() => {
      const groups: Record<string, AchievementProgress[]> = {}
      for (const item of progress.value) {
        if (!groups[item.category]) {
          groups[item.category] = []
        }
        groups[item.category].push(item)
      }
      return groups
    })
  }
}
