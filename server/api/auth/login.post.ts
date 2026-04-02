import { createUserSession, ensureBaseData, verifyPassword } from '../../utils/auth'
import { prisma } from '../../utils/db'

export default defineEventHandler(async (event) => {
  const body = await readBody<{
    email?: string
    password?: string
  }>(event)

  const email = body.email?.trim().toLowerCase()
  const password = body.password?.trim()

  if (!email || !password) {
    throw createError({
      statusCode: 400,
      statusMessage: 'Please enter both your email and password.'
    })
  }

  await ensureBaseData()

  const user = await prisma.user.findUnique({
    where: { email }
  })

  if (!user?.passwordHash || !verifyPassword(password, user.passwordHash)) {
    throw createError({
      statusCode: 401,
      statusMessage: 'That email or password does not look right.'
    })
  }

  await createUserSession(event, user.id)

  return {
    user: {
      id: user.id,
      email: user.email,
      name: user.name
    }
  }
})
