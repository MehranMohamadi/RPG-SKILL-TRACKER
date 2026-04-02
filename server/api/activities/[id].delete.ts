import { requireUser } from '../../utils/auth'
import { prisma } from '../../utils/db'

export default defineEventHandler(async (event) => {
  const user = await requireUser(event)
  const id = getRouterParam(event, 'id')

  if (!id) {
    throw createError({
      statusCode: 400,
      statusMessage: 'Activity id is required.'
    })
  }

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

  await prisma.activity.delete({
    where: { id }
  })

  return { success: true }
})
