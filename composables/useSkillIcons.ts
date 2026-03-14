export type SkillIconName =
  | 'star'
  | 'code'
  | 'book'
  | 'brain'
  | 'target'
  | 'dumbbell'
  | 'heart'
  | 'music'
  | 'camera'
  | 'briefcase'
  | 'globe'
  | 'palette'
  | 'gamepad'
  | 'pen'
  | 'mic'
  | 'rocket'

export const skillIcons: Array<{ name: SkillIconName; label: string }> = [
  { name: 'star', label: 'Star' },
  { name: 'code', label: 'Code' },
  { name: 'book', label: 'Book' },
  { name: 'brain', label: 'Brain' },
  { name: 'target', label: 'Target' },
  { name: 'dumbbell', label: 'Fitness' },
  { name: 'heart', label: 'Health' },
  { name: 'music', label: 'Music' },
  { name: 'camera', label: 'Photo' },
  { name: 'briefcase', label: 'Career' },
  { name: 'globe', label: 'Language' },
  { name: 'palette', label: 'Art' },
  { name: 'gamepad', label: 'Gaming' },
  { name: 'pen', label: 'Writing' },
  { name: 'mic', label: 'Speaking' },
  { name: 'rocket', label: 'Growth' }
]

const skillIconSet = new Set(skillIcons.map((item) => item.name))

export const isSkillIconName = (value: string): value is SkillIconName =>
  skillIconSet.has(value as SkillIconName)
