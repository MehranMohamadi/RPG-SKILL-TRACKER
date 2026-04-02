import { Prisma } from '@prisma/client'
import { createUserSession, ensureBaseData, hashPassword } from '../../utils/auth'
import { prisma } from '../../utils/db'

export default defineEventHandler(async (event) => {
  const body = await readBody<{
    email?: string
    password?: string
    name?: string | null
  }>(event)

  const email = body.email?.trim().toLowerCase()
  const password = body.password?.trim()
  const name = body.name?.trim() || null

  if (!email || !password) {
    throw createError({
      statusCode: 400,
      statusMessage: 'Please enter both an email and a password.'
    })
  }

  if (password.length < 6) {
    throw createError({
      statusCode: 400,
      statusMessage: 'Choose a password with at least 6 characters.'
    })
  }

  await ensureBaseData()

  try {
    const user = await prisma.user.create({
      data: {
        email,
        name,
        passwordHash: hashPassword(password)
      }
    })

    await createUserSession(event, user.id)

    return {
      user: {
        id: user.id,
        email: user.email,
        name: user.name
      }
    }
  } catch (error) {
    if (error instanceof Prisma.PrismaClientKnownRequestError && error.code === 'P2002') {
      throw createError({
        statusCode: 409,
        statusMessage: 'This email is already in use. Try signing in instead.'
      })
    }

    throw error
  }
})
