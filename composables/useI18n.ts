type Locale = 'en' | 'fa'

const messages = {
  en: {
    app: {
      subtitle: 'Turn real-life progress into a steady RPG-style climb.',
      dashboard: 'Dashboard',
      skills: 'Skills',
      achievements: 'Achievements',
      english: 'English',
      persian: 'فارسی',
      close: 'Close',
      themeDark: 'Dark',
      themeLight: 'Light'
    },
    common: {
      xp: 'XP',
      level: 'Level',
      today: 'Today',
      activities: 'activities',
      skill: 'Skill',
      notFound: 'Skill not found.',
      optional: 'Optional',
      days: 'days',
      unlocked: 'Unlocked'
    },
    skills: {
      delete: 'Delete'
    },
    activities: {
      emptyList: 'No activities yet. Add one to start earning XP.',
      cooldown: '{minutes}m cooldown',
      fallbackDescription: 'Small repeatable action for this skill.',
      complete: 'Complete',
      edit: 'Edit'
    },
    forms: {
      skillName: 'Skill name',
      icon: 'Icon',
      description: 'Description',
      accentColor: 'Accent color',
      saveSkill: 'Save skill',
      programming: 'Programming',
      skillDescriptionPlaceholder: 'A short summary of what this skill means to you.',
      activityName: 'Activity name',
      xpReward: 'XP reward',
      cooldownMinutes: 'Cooldown (minutes)',
      activityDescriptionPlaceholder: 'What does completing this activity look like?',
      saveActivity: 'Save activity',
      buildProject: 'Build project'
    },
    card: {
      defaultSkillDescription: 'Build momentum with repeatable activities and steady XP gains.'
    },
    achievements: {
      title: 'Achievements',
      subtitle: 'Badges, streaks, XP milestones, and mastery goals.',
      unlockedCounter: '{unlocked} / {total} unlocked',
      currentStreak: 'Current Streak',
      bestStreak: 'Best Streak',
      totalXp: 'Total XP',
      completedActivities: 'Completed Activities',
      sectionBeginner: 'Beginner',
      sectionConsistency: 'Consistency',
      sectionXp: 'XP Milestones',
      sectionSkill: 'Skill Mastery',
      sectionActivity: 'Activity Volume',
      sectionExplorer: 'Explorer',
      sectionProgress: '{done} / {total}',
      firstActivityTitle: 'First Step',
      firstActivityDescription: 'Complete your first activity.',
      streak3Title: '3 Day Streak',
      streak3Description: 'Complete activities for 3 consecutive days.',
      streak7Title: '7 Day Streak',
      streak7Description: 'Complete activities for 7 consecutive days.',
      streak30Title: '30 Day Streak',
      streak30Description: 'Complete activities for 30 consecutive days.',
      xp100Title: '100 XP',
      xp100Description: 'Earn 100 total XP.',
      xp500Title: '500 XP',
      xp500Description: 'Earn 500 total XP.',
      xp1000Title: '1000 XP',
      xp1000Description: 'Earn 1,000 total XP.',
      xp5000Title: '5000 XP',
      xp5000Description: 'Earn 5,000 total XP.',
      skill5Title: 'Level 5 Skill',
      skill5Description: 'Reach level 5 in any skill.',
      skill10Title: 'Level 10 Skill',
      skill10Description: 'Reach level 10 in any skill.',
      skill20Title: 'Master a Skill',
      skill20Description: 'Reach level 20 in any skill.',
      activity10Title: '10 Activities',
      activity10Description: 'Complete 10 activities.',
      activity50Title: '50 Activities',
      activity50Description: 'Complete 50 activities.',
      activity100Title: '100 Activities',
      activity100Description: 'Complete 100 activities.',
      skills3Title: 'Explorer 3',
      skills3Description: 'Create 3 skills.',
      skills5Title: 'Explorer 5',
      skills5Description: 'Create 5 skills.',
      skills10Title: 'Explorer 10',
      skills10Description: 'Create 10 skills.'
    },
    progress: {
      ratio: '{current} / {required} XP'
    }
  },
  fa: {
    app: {
      subtitle: 'پیشرفت واقعی زندگی را به یک مسیر پایدار شبیه RPG تبدیل کن.',
      dashboard: 'داشبورد',
      skills: 'مهارت‌ها',
      achievements: 'دستاوردها',
      english: 'English',
      persian: 'فارسی',
      close: 'بستن',
      themeDark: 'تیره',
      themeLight: 'روشن'
    },
    common: {
      xp: 'XP',
      level: 'سطح',
      today: 'امروز',
      activities: 'فعالیت',
      skill: 'مهارت',
      notFound: 'مهارت پیدا نشد.',
      optional: 'اختیاری',
      days: 'روز',
      unlocked: 'بازشده'
    },
    skills: {
      delete: 'حذف'
    },
    activities: {
      emptyList: 'هنوز فعالیتی ثبت نشده. یکی اضافه کن تا XP بگیری.',
      cooldown: 'کول‌داون {minutes} دقیقه',
      fallbackDescription: 'یک اقدام کوچک و تکرارشونده برای این مهارت.',
      complete: 'تکمیل',
      edit: 'ویرایش'
    },
    forms: {
      skillName: 'نام مهارت',
      icon: 'آیکون',
      description: 'توضیحات',
      accentColor: 'رنگ اصلی',
      saveSkill: 'ذخیره مهارت',
      programming: 'برنامه‌نویسی',
      skillDescriptionPlaceholder: 'یک توضیح کوتاه از معنای این مهارت برای شما.',
      activityName: 'نام فعالیت',
      xpReward: 'پاداش XP',
      cooldownMinutes: 'کول‌داون (دقیقه)',
      activityDescriptionPlaceholder: 'تکمیل این فعالیت دقیقا چه شکلی است؟',
      saveActivity: 'ذخیره فعالیت',
      buildProject: 'ساخت پروژه'
    },
    card: {
      defaultSkillDescription: 'با فعالیت‌های تکرارشونده و XP پایدار مومنتوم بساز.'
    },
    achievements: {
      title: 'دستاوردها',
      subtitle: 'نشان‌ها، استریک، نقاط عطف XP و هدف‌های استادی.',
      unlockedCounter: '{unlocked} / {total} بازشده',
      currentStreak: 'استریک فعلی',
      bestStreak: 'بهترین استریک',
      totalXp: 'XP کل',
      completedActivities: 'فعالیت‌های تکمیل‌شده',
      sectionBeginner: 'شروع',
      sectionConsistency: 'پیوستگی',
      sectionXp: 'نقاط عطف XP',
      sectionSkill: 'استادی مهارت',
      sectionActivity: 'حجم فعالیت',
      sectionExplorer: 'کاوشگر',
      sectionProgress: '{done} / {total}',
      firstActivityTitle: 'اولین قدم',
      firstActivityDescription: 'اولین فعالیت خودت را تکمیل کن.',
      streak3Title: 'استریک ۳ روزه',
      streak3Description: '۳ روز پیاپی فعالیت تکمیل کن.',
      streak7Title: 'استریک ۷ روزه',
      streak7Description: '۷ روز پیاپی فعالیت تکمیل کن.',
      streak30Title: 'استریک ۳۰ روزه',
      streak30Description: '۳۰ روز پیاپی فعالیت تکمیل کن.',
      xp100Title: '۱۰۰ XP',
      xp100Description: 'مجموعا ۱۰۰ XP کسب کن.',
      xp500Title: '۵۰۰ XP',
      xp500Description: 'مجموعا ۵۰۰ XP کسب کن.',
      xp1000Title: '۱۰۰۰ XP',
      xp1000Description: 'مجموعا ۱۰۰۰ XP کسب کن.',
      xp5000Title: '۵۰۰۰ XP',
      xp5000Description: 'مجموعا ۵۰۰۰ XP کسب کن.',
      skill5Title: 'مهارت سطح ۵',
      skill5Description: 'به سطح ۵ در یکی از مهارت‌ها برس.',
      skill10Title: 'مهارت سطح ۱۰',
      skill10Description: 'به سطح ۱۰ در یکی از مهارت‌ها برس.',
      skill20Title: 'استاد یک مهارت',
      skill20Description: 'به سطح ۲۰ در یکی از مهارت‌ها برس.',
      activity10Title: '۱۰ فعالیت',
      activity10Description: '۱۰ فعالیت را کامل کن.',
      activity50Title: '۵۰ فعالیت',
      activity50Description: '۵۰ فعالیت را کامل کن.',
      activity100Title: '۱۰۰ فعالیت',
      activity100Description: '۱۰۰ فعالیت را کامل کن.',
      skills3Title: 'کاوشگر ۳',
      skills3Description: '۳ مهارت بساز.',
      skills5Title: 'کاوشگر ۵',
      skills5Description: '۵ مهارت بساز.',
      skills10Title: 'کاوشگر ۱۰',
      skills10Description: '۱۰ مهارت بساز.'
    },
    progress: {
      ratio: '{current} / {required} XP'
    }
  }
} as const

type MessageKey = string
type MessageParams = Record<string, string | number>

const resolveMessage = (locale: Locale, key: MessageKey): string => {
  const chunks = key.split('.')
  let current: unknown = messages[locale]

  for (const chunk of chunks) {
    if (typeof current !== 'object' || current === null || !(chunk in current)) {
      return key
    }
    current = (current as Record<string, unknown>)[chunk]
  }

  return typeof current === 'string' ? current : key
}

const formatTemplate = (template: string, params?: MessageParams): string => {
  if (!params) {
    return template
  }
  return template.replaceAll(/\{(\w+)\}/g, (_match, token: string) => String(params[token] ?? `{${token}}`))
}

export const useI18n = () => {
  const localeCookie = useCookie<Locale>('locale', { default: () => 'en' })
  const locale = useState<Locale>('locale', () => localeCookie.value ?? 'en')

  watch(
    locale,
    (value) => {
      localeCookie.value = value
    },
    { immediate: true }
  )

  const isRtl = computed(() => locale.value === 'fa')

  const t = (key: MessageKey, params?: MessageParams) => {
    const template = resolveMessage(locale.value, key)
    return formatTemplate(template, params)
  }

  const n = (value: number) => new Intl.NumberFormat(locale.value === 'fa' ? 'fa-IR' : 'en-US').format(value)

  const d = (value: string | Date) =>
    new Intl.DateTimeFormat(locale.value === 'fa' ? 'fa-IR' : 'en-US', {
      dateStyle: 'medium',
      timeStyle: 'short'
    }).format(new Date(value))

  const setLocale = (value: Locale) => {
    locale.value = value
  }

  return { locale, isRtl, t, n, d, setLocale }
}
