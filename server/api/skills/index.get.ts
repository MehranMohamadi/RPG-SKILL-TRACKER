import { ensureDemoUser } from '../../utils/demo-user'
import { prisma } from '../../utils/db'

export default defineEventHandler(async () => {
  const user = await ensureDemoUser()

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
