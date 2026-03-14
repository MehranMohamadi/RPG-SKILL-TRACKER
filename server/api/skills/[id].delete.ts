import { ensureDemoUser } from '../../utils/demo-user'
import { prisma } from '../../utils/db'

export default defineEventHandler(async (event) => {
  const user = await ensureDemoUser()
  const id = getRouterParam(event, 'id')

  if (!id) {
    throw createError({
      statusCode: 400,
      statusMessage: 'Skill id is required.'
    })
  }

  const skill = await prisma.skill.findFirst({
    where: {
      id,
      userId: user.id
    }
  })

  if (!skill) {
    throw createError({
      statusCode: 404,
      statusMessage: 'Skill not found.'
    })
  }

  await prisma.skill.delete({
    where: { id }
  })

  return { success: true }
})
