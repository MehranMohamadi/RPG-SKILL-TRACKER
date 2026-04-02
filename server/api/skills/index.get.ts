import { requireUser } from '../../utils/auth'
import { prisma } from '../../utils/db'

export default defineEventHandler(async (event) => {
  const user = await requireUser(event)

  return prisma.skill.findMany({
    where: { userId: user.id },
    include: {
      activities: {
        orderBy: {
          createdAt: 'desc'
        }
      }
    },
    orderBy: {
      updatedAt: 'desc'
    }
  })
})
