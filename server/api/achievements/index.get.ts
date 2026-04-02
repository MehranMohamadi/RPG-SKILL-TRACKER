import { requireUser } from '../../utils/auth'
import { getUserAchievements } from '../../utils/achievements'

export default defineEventHandler(async (event) => {
  const user = await requireUser(event)

  return getUserAchievements(user.id)
})
