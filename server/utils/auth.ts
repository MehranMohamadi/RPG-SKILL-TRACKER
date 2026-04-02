import { randomBytes, scryptSync, timingSafeEqual } from 'node:crypto'
import { createError, deleteCookie, getCookie, setCookie } from 'h3'
import { prisma } from './db'

const SESSION_COOKIE = 'skillxp_session'
const SESSION_TTL_DAYS = 30

const defaultAchievements = [
  {
    key: 'first_activity',
    title: 'First Steps',
    description: 'Complete your first activity.',
    icon: 'Sparkles',
    xpReward: 25
  },
  {
    key: 'skill_level_5',
    title: 'Level 5 Reached',
    description: 'Reach level 5 in any skill.',
    icon: 'Trophy',
    xpReward: 50
  },
  {
    key: 'earn_500_xp',
    title: 'XP Collector',
    description: 'Earn 500 total XP across all activities.',
    icon: 'Star',
    xpReward: 75
  }
] as const

export type AuthUser = {
  id: string
  email: string
  name: string | null
}

const toAuthUser = (user: { id: string; email: string; name: string | null }): AuthUser => ({
  id: user.id,
  email: user.email,
  name: user.name
})

export const ensureBaseData = async () => {
  await Promise.all(
    defaultAchievements.map((achievement) =>
      prisma.achievement.upsert({
        where: { key: achievement.key },
        update: achievement,
        create: achievement
      })
    )
  )
}

export const hashPassword = (password: string) => {
  const salt = randomBytes(16).toString('hex')
  const hash = scryptSync(password, salt, 64).toString('hex')
  return `${salt}:${hash}`
}

export const verifyPassword = (password: string, passwordHash: string) => {
  const [salt, storedHash] = passwordHash.split(':')

  if (!salt || !storedHash) {
    return false
  }

  const derived = scryptSync(password, salt, 64)
  const stored = Buffer.from(storedHash, 'hex')

  return stored.length === derived.length && timingSafeEqual(stored, derived)
}

export const createUserSession = async (event: Parameters<typeof setCookie>[0], userId: string) => {
  const token = randomBytes(32).toString('hex')
  const expiresAt = new Date(Date.now() + SESSION_TTL_DAYS * 24 * 60 * 60 * 1000)

  await prisma.session.create({
    data: {
      token,
      userId,
      expiresAt
    }
  })

  setCookie(event, SESSION_COOKIE, token, {
    path: '/',
    sameSite: 'lax',
    secure: process.env.NODE_ENV === 'production',
    expires: expiresAt
  })
}

export const clearUserSession = async (event: Parameters<typeof setCookie>[0]) => {
  const token = getCookie(event, SESSION_COOKIE)

  if (token) {
    await prisma.session.deleteMany({
      where: { token }
    })
  }

  deleteCookie(event, SESSION_COOKIE, {
    path: '/'
  })
}

export const getCurrentUser = async (event: Parameters<typeof setCookie>[0]) => {
  const token = getCookie(event, SESSION_COOKIE)

  if (!token) {
    return null
  }

  const session = await prisma.session.findFirst({
    where: {
      token,
      expiresAt: {
        gt: new Date()
      }
    },
    include: {
      user: true
    }
  })

  if (!session) {
    deleteCookie(event, SESSION_COOKIE, { path: '/' })
    return null
  }

  return toAuthUser(session.user)
}

export const requireUser = async (event: Parameters<typeof setCookie>[0]) => {
  const user = await getCurrentUser(event)

  if (!user) {
    throw createError({
      statusCode: 401,
      statusMessage: 'Authentication required'
    })
  }

  return user
}
