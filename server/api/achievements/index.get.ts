import { ensureDemoUser } from '../../utils/demo-user'
import { getUserAchievements } from '../../utils/achievements'

export default defineEventHandler(async () => {
  const user = await ensureDemoUser()

  return getUserAchievements(user.id)
})
