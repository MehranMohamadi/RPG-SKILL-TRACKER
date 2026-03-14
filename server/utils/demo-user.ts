import { Prisma } from '@prisma/client'
import { createError } from 'h3'
import { prisma } from './db'

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
]

export const ensureDemoUser = async () => {
  if (!process.env.DATABASE_URL) {
    throw createError({
      statusCode: 500,
      statusMessage: 'Database is not configured',
      message: 'Set DATABASE_URL in a local .env file before calling the API.'
    })
  }

  const email = 'demo@skillxp.local'

  try {
    const user = await prisma.user.upsert({
      where: { email },
      update: {},
      create: {
        email,
        name: 'SkillXP Demo User'
      }
    })

    await Promise.all(
      defaultAchievements.map((achievement) =>
        prisma.achievement.upsert({
          where: { key: achievement.key },
          update: achievement,
          create: achievement
        })
      )
    )

    return user
  } catch (error) {
    if (error instanceof Prisma.PrismaClientInitializationError) {
      if (error.errorCode === 'P1000') {
        throw createError({
          statusCode: 503,
          statusMessage: 'Database authentication failed',
          message:
            'SkillXP reached PostgreSQL, but the username or password in DATABASE_URL is invalid.'
        })
      }

      if (error.errorCode === 'P1001') {
        throw createError({
          statusCode: 503,
          statusMessage: 'Database is unreachable',
          message:
            'SkillXP could not reach PostgreSQL. Make sure the server is running and DATABASE_URL points to the correct host and port.'
        })
      }

      throw createError({
        statusCode: 503,
        statusMessage: 'Database connection failed',
        message:
          'SkillXP could not connect to PostgreSQL. Make sure Postgres is running and DATABASE_URL points to it.'
      })
    }

    if (error instanceof Prisma.PrismaClientKnownRequestError && error.code === 'P2021') {
      throw createError({
        statusCode: 500,
        statusMessage: 'Database schema is missing',
        message: 'Prisma tables are not initialized yet. Run `npm run prisma:push` and reload the app.'
      })
    }

    throw error
  }
}
