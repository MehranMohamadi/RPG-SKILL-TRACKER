import { ensureDemoUser } from '../../utils/demo-user'
import { prisma } from '../../utils/db'

export default defineEventHandler(async (event) => {
  const user = await ensureDemoUser()
  const id = getRouterParam(event, 'id')

  if (!id) {
    throw createError({
      statusCode: 400,
      statusMessage: 'Activity id is required.'
    })
  }

  const body = await readBody<{
    name?: string
    description?: string | null
    xpReward?: number
    cooldown?: number | null
    subActivities?: Array<{
      name?: string
      xpReward?: number
    }>
  }>(event)

  const activity = await prisma.activity.findFirst({
    where: {
      id,
      skill: {
        userId: user.id
      }
    }
  })

  if (!activity) {
    throw createError({
      statusCode: 404,
      statusMessage: 'Activity not found.'
    })
  }

  const subActivities = body.subActivities
    ?.map((item, index) => ({
      name: item.name?.trim() ?? '',
      xpReward: item.xpReward ?? 10,
      sortOrder: index
    }))
    .filter((item) => item.name.length > 0)

  return prisma.activity.update({
    where: { id },
    data: {
      name: body.name ?? activity.name,
      description: body.description === undefined ? activity.description : body.description,
      xpReward: body.xpReward ?? activity.xpReward,
      cooldown: body.cooldown === undefined ? activity.cooldown : body.cooldown,
      subActivities:
        subActivities === undefined
          ? undefined
          : {
              deleteMany: {},
              create: subActivities
            }
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
