import { requireUser } from '../../utils/auth'
import { prisma } from '../../utils/db'

export default defineEventHandler(async (event) => {
  const user = await requireUser(event)
  const body = await readBody<{
    skillId?: string
    name?: string
    description?: string | null
    xpReward?: number
    cooldown?: number | null
    subActivities?: Array<{
      name?: string
      xpReward?: number
    }>
  }>(event)

  if (!body.skillId || !body.name || body.xpReward == null) {
    throw createError({
      statusCode: 400,
      statusMessage: 'Skill, name, and xp reward are required.'
    })
  }

  const skill = await prisma.skill.findFirst({
    where: {
      id: body.skillId,
      userId: user.id
    }
  })

  if (!skill) {
    throw createError({
      statusCode: 404,
      statusMessage: 'Skill not found.'
    })
  }

  const subActivities = (body.subActivities ?? [])
    .map((item, index) => ({
      name: item.name?.trim() ?? '',
      xpReward: item.xpReward ?? 10,
      sortOrder: index
    }))
    .filter((item) => item.name.length > 0)

  return prisma.activity.create({
    data: {
      skillId: body.skillId,
      name: body.name,
      description: body.description ?? null,
      xpReward: body.xpReward,
      cooldown: body.cooldown ?? null,
      subActivities: subActivities.length
        ? {
            create: subActivities
          }
        : undefined
    },
    include: {
      subActivities: {
        orderBy: {
          sortOrder: 'asc'
        }
      }
    }
  })
})
