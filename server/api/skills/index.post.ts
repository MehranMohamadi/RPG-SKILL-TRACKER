import { calculateXpRequired } from '../../utils/xp'
import { requireUser } from '../../utils/auth'
import { prisma } from '../../utils/db'

export default defineEventHandler(async (event) => {
  const body = await readBody<{
    name?: string
    icon?: string
    color?: string
    description?: string | null
  }>(event)

  if (!body.name || !body.icon || !body.color) {
    throw createError({
      statusCode: 400,
      statusMessage: 'Name, icon, and color are required.'
    })
  }

  const user = await requireUser(event)

  return prisma.skill.create({
    data: {
      userId: user.id,
      name: body.name,
      icon: body.icon,
      color: body.color,
      description: body.description ?? null,
      xpToNextLevel: calculateXpRequired(1)
    }
  })
})
