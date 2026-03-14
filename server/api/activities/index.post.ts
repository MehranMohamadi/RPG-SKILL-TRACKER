import { ensureDemoUser } from '../../utils/demo-user'
import { prisma } from '../../utils/db'

export default defineEventHandler(async (event) => {
  const user = await ensureDemoUser()
  const body = await readBody<{
    skillId?: string
    name?: string
    description?: string | null
    xpReward?: number
    cooldown?: number | null
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

  return prisma.activity.create({
    data: {
      skillId: body.skillId,
      name: body.name,
      description: body.description ?? null,
      xpReward: body.xpReward,
      cooldown: body.cooldown ?? null
    }
  })
})
