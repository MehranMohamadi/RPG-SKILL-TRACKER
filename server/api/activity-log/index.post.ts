import { ensureDemoUser } from '../../utils/demo-user'
import { unlockAchievements } from '../../utils/achievements'
import { prisma } from '../../utils/db'
import { applyXpGain } from '../../utils/xp'

export default defineEventHandler(async (event) => {
  const user = await ensureDemoUser()
  const body = await readBody<{
    activityId?: string
    subActivityId?: string
  }>(event)

  if (!body.activityId && !body.subActivityId) {
    throw createError({
      statusCode: 400,
      statusMessage: 'Activity id or sub-activity id is required.'
    })
  }

  return prisma.$transaction(async (tx) => {
    const subActivity = body.subActivityId
      ? await tx.subActivity.findFirst({
          where: {
            id: body.subActivityId,
            activity: {
              skill: {
                userId: user.id
              }
            }
          },
          include: {
            activity: {
              include: {
                skill: true,
                subActivities: {
                  orderBy: {
                    sortOrder: 'asc'
                  }
                }
              }
            }
          }
        })
      : null

    const activity = subActivity
      ? subActivity.activity
      : await tx.activity.findFirst({
          where: {
            id: body.activityId,
            skill: {
              userId: user.id
            }
          },
          include: {
            skill: true,
            subActivities: {
              orderBy: {
                sortOrder: 'asc'
              }
            }
          }
        })

    if (!activity) {
      throw createError({
        statusCode: 404,
        statusMessage: body.subActivityId ? 'Sub-activity not found.' : 'Activity not found.'
      })
    }

    if (!subActivity && activity.subActivities.length > 0) {
      throw createError({
        statusCode: 409,
        statusMessage: 'Complete one of the sub-activities for this activity.'
      })
    }

    if (!subActivity && activity.cooldown) {
      const latestLog = await tx.activityLog.findFirst({
        where: {
          userId: user.id,
          activityId: activity.id,
          subActivityId: null
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

    const xpEarned = subActivity?.xpReward ?? activity.xpReward
    const nextSkillState = applyXpGain(activity.skill.level, activity.skill.xp, xpEarned)

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
        subActivityId: subActivity?.id ?? null,
        xpEarned
      },
      include: {
        activity: {
          include: {
            subActivities: {
              orderBy: {
                sortOrder: 'asc'
              }
            },
            skill: true
          }
        },
        subActivity: true
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
