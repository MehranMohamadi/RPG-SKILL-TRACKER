import { ensureDemoUser } from '../../utils/demo-user'
import { prisma } from '../../utils/db'
import { calculateUserLevel } from '../../utils/xp'

export default defineEventHandler(async () => {
  const user = await ensureDemoUser()
  const startOfToday = new Date()
  startOfToday.setHours(0, 0, 0, 0)

  const [skillsCount, totalXpAggregate, activityLogsToday] = await Promise.all([
    prisma.skill.count({
      where: {
        userId: user.id
      }
    }),
    prisma.activityLog.aggregate({
      where: {
        userId: user.id
      },
      _sum: {
        xpEarned: true
      }
    }),
    prisma.activityLog.count({
      where: {
        userId: user.id,
        completedAt: {
          gte: startOfToday
        }
      }
    })
  ])

  const totalXp = totalXpAggregate._sum.xpEarned ?? 0

  return {
    totalXp,
    userLevel: calculateUserLevel(totalXp),
    skillsCount,
    activitiesCompletedToday: activityLogsToday
  }
})
