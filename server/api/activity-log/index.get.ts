import { requireUser } from '../../utils/auth'
import { prisma } from '../../utils/db'

export default defineEventHandler(async (event) => {
  const user = await requireUser(event)
  const limit = Number(getQuery(event).limit ?? 20)

  return prisma.activityLog.findMany({
    where: {
      userId: user.id
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
    },
    orderBy: {
      completedAt: 'desc'
    },
    take: Number.isNaN(limit) ? 20 : Math.min(limit, 50)
  })
})
