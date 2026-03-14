export const calculateXpRequired = (level: number) => {
  return Math.floor(100 * Math.pow(level, 1.5))
}

export const calculateUserLevel = (totalXp: number) => {
  let level = 1

  while (totalXp >= calculateXpRequired(level)) {
    totalXp -= calculateXpRequired(level)
    level += 1
  }

  return level
}

export const applyXpGain = (currentLevel: number, currentXp: number, xpReward: number) => {
  let level = currentLevel
  let xp = currentXp + xpReward
  let xpToNextLevel = calculateXpRequired(level)
  let leveledUp = false

  while (xp >= xpToNextLevel) {
    xp -= xpToNextLevel
    level += 1
    xpToNextLevel = calculateXpRequired(level)
    leveledUp = true
  }

  return {
    level,
    xp,
    xpToNextLevel,
    leveledUp
  }
}
