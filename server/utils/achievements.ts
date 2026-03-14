import type { Prisma } from '@prisma/client'
import { prisma } from './db'
type SkillSnapshot = {
  level: number
}

type UnlockAchievementInput = {
  userId: string
  totalXp: number
  skill: SkillSnapshot
}

const unlockByKey = async (tx: Prisma.TransactionClient, userId: string, key: string) => {
  const achievement = await tx.achievement.findUnique({
    where: { key }
  })

  if (!achievement) {
    return null
  }

  const existing = await tx.userAchievement.findUnique({
    where: {
      userId_achievementId: {
        userId,
        achievementId: achievement.id
      }
    },
    include: {
      achievement: true
    }
  })

  if (existing) {
    return null
  }

  return tx.userAchievement.create({
    data: {
      userId,
      achievementId: achievement.id
    },
    include: {
      achievement: true
    }
  })
}

export const unlockAchievements = async (
  tx: Prisma.TransactionClient,
  input: UnlockAchievementInput
) => {
  const unlocked = await Promise.all([
    input.totalXp > 0 ? unlockByKey(tx, input.userId, 'first_activity') : Promise.resolve(null),
    input.skill.level >= 5 ? unlockByKey(tx, input.userId, 'skill_level_5') : Promise.resolve(null),
    input.totalXp >= 500 ? unlockByKey(tx, input.userId, 'earn_500_xp') : Promise.resolve(null)
  ])

  return unlocked.filter(Boolean)
}

export const getUserAchievements = async (userId: string) => {
  return prisma.userAchievement.findMany({
    where: { userId },
    include: {
      achievement: true
    },
    orderBy: {
      unlockedAt: 'desc'
    }
  })
}
