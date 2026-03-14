import { ensureDemoUser } from '../../utils/demo-user'
import { prisma } from '../../utils/db'

export default defineEventHandler(async (event) => {
  const user = await ensureDemoUser()
  const limit = Number(getQuery(event).limit ?? 20)

  return prisma.activityLog.findMany({
    where: {
      userId: user.id
    },
    include: {
      activity: {
        include: {
          skill: true
        }
      }
    },
    orderBy: {
      completedAt: 'desc'
    },
    take: Number.isNaN(limit) ? 20 : Math.min(limit, 50)
  })
})
