import { ensureDemoUser } from '../../utils/demo-user'
import { unlockAchievements } from '../../utils/achievements'
import { prisma } from '../../utils/db'
import { applyXpGain } from '../../utils/xp'

export default defineEventHandler(async (event) => {
  const user = await ensureDemoUser()
  const body = await readBody<{
    activityId?: string
  }>(event)

  if (!body.activityId) {
    throw createError({
      statusCode: 400,
      statusMessage: 'Activity id is required.'
    })
  }

  return prisma.$transaction(async (tx) => {
    const activity = await tx.activity.findFirst({
      where: {
        id: body.activityId,
        skill: {
          userId: user.id
        }
      },
      include: {
        skill: true
      }
    })

    if (!activity) {
      throw createError({
        statusCode: 404,
        statusMessage: 'Activity not found.'
      })
    }

    if (activity.cooldown) {
      const latestLog = await tx.activityLog.findFirst({
        where: {
          userId: user.id,
          activityId: activity.id
        },
        orderBy: {
          completedAt: 'desc'
        }
      })

      if (latestLog) {
        const cooldownEndsAt = new Date(latestLog.completedAt.getTime() + activity.cooldown * 60 * 1000)

        if (cooldownEndsAt > new Date()) {
          throw createError({
            statusCode: 409,
            statusMessage: 'This activity is still on cooldown.'
          })
        }
      }
    }

    const nextSkillState = applyXpGain(activity.skill.level, activity.skill.xp, activity.xpReward)

    const updatedSkill = await tx.skill.update({
      where: {
        id: activity.skill.id
      },
      data: {
        level: nextSkillState.level,
        xp: nextSkillState.xp,
        xpToNextLevel: nextSkillState.xpToNextLevel
      }
    })

    const activityLog = await tx.activityLog.create({
      data: {
        userId: user.id,
        activityId: activity.id,
        xpEarned: activity.xpReward
      },
      include: {
        activity: {
          include: {
            skill: true
          }
        }
      }
    })

    const totalXpAggregate = await tx.activityLog.aggregate({
      where: {
        userId: user.id
      },
      _sum: {
        xpEarned: true
      }
    })

    const unlockedAchievements = await unlockAchievements(tx, {
      userId: user.id,
      totalXp: totalXpAggregate._sum.xpEarned ?? 0,
      skill: updatedSkill
    })

    return {
      skill: updatedSkill,
      activityLog,
      leveledUp: nextSkillState.leveledUp,
      unlockedAchievements
    }
  })
})
