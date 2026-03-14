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

  const body = await readBody<{
    name?: string
    icon?: string
    color?: string
    description?: string | null
  }>(event)

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

  return prisma.skill.update({
    where: { id },
    data: {
      name: body.name ?? skill.name,
      icon: body.icon ?? skill.icon,
      color: body.color ?? skill.color,
      description: body.description === undefined ? skill.description : body.description
    }
  })
})
