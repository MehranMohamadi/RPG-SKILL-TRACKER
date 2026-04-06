import { createUserSession, ensureBaseData } from '../../utils/auth'
import { prisma } from '../../utils/db'

export default defineOAuthGoogleEventHandler({
  async onSuccess(event, { user }) {
    const email = user.email?.trim().toLowerCase()

    if (!email) {
      return sendRedirect(event, '/login?error=google_email_required')
    }

    await ensureBaseData()

    let dbUser = await prisma.user.findUnique({
      where: { email }
    })

    if (!dbUser) {
      dbUser = await prisma.user.create({
        data: {
          email,
          name: user.name?.trim() || null
        }
      })
    }

    await createUserSession(event, dbUser.id)

    return sendRedirect(event, '/dashboard')
  },

  onError(event, error) {
    console.error('Google OAuth error:', error)
    return sendRedirect(event, '/login?error=google_oauth_failed')
  }
})