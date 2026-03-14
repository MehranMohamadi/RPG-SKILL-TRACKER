type Locale = 'en' | 'fa'

const messages = {
  en: {
    app: {
      subtitle: 'Turn real-life progress into a steady RPG-style climb.',
      dashboard: 'Dashboard',
      skills: 'Skills',
      english: 'English',
      persian: 'فارسی',
      close: 'Close'
    },
    common: {
      xp: 'XP',
      level: 'Level',
      today: 'Today',
      activities: 'activities',
      skill: 'Skill',
      notFound: 'Skill not found.',
      optional: 'Optional'
    },
    dashboard: {
      yourSkills: 'Your Skills',
      tracksCopy: 'Quick access to your active growth tracks.',
      newSkill: 'New skill',
      noSkills: 'No skills yet. Create your first one to start the progression loop.',
      activityLog: "Today's Activity Log",
      activityLogCopy: 'Recent actions and the XP they generated.',
      noActivityLogs: "Complete an activity to start building today's log.",
      achievements: 'Achievements',
      achievementsCopy: 'Milestones unlocked as your system compounds.',
      noAchievements: 'Achievements will appear as you complete activities and reach milestones.'
    },
    stats: {
      totalXp: 'Total XP',
      totalXpCopy: 'Every completed activity pushes your account forward.',
      userLevel: 'User Level',
      userLevelCopy: 'A cross-skill snapshot of your current momentum.',
      skills: 'Skills',
      skillsCopy: 'Focused disciplines you are actively growing.',
      completedToday: 'Completed Today',
      completedTodayCopy: "A quick pulse check on today's consistency."
    },
    skills: {
      title: 'Skills',
      copy: 'Create, update, and prune the tracks that shape your growth.',
      createSkill: 'Create skill',
      updateSkill: 'Update skill',
      open: 'Open',
      delete: 'Delete',
      emptyDescription: 'A steady track for long-term progression.',
      createdTitle: 'Skill created',
      createdMessage: '{name} is ready for XP gains.',
      updatedTitle: 'Skill updated',
      updatedMessage: 'Your skill details were saved successfully.',
      removedTitle: 'Skill removed',
      removedMessage: 'The skill and its activities have been deleted.',
      createTitle: 'Create Skill',
      createCopy: 'Define a new area to level up over time.',
      detailsLevelXp: 'Level {level} - {xp} XP banked'
    },
    activities: {
      editActivity: 'Edit Activity',
      addActivity: 'Add Activity',
      formCopy: 'Activities are the repeatable actions that generate XP.',
      updateActivity: 'Update activity',
      addActivityButton: 'Add activity',
      cancelEditing: 'Cancel editing',
      listTitle: 'Activities',
      listCopy: 'Complete tasks, gain XP, and keep the streak alive.',
      historyTitle: 'Activity History',
      historyCopy: 'Recent completions tied to this skill.',
      emptyHistory: 'No history yet for this skill. Complete an activity to start the log.',
      emptyList: 'No activities yet. Add one to start earning XP.',
      cooldown: '{minutes}m cooldown',
      fallbackDescription: 'Small repeatable action for this skill.',
      complete: 'Complete',
      edit: 'Edit',
      activityUpdatedTitle: 'Activity updated',
      activityUpdatedMessage: 'The activity changes are now live.',
      activityAddedTitle: 'Activity added',
      activityAddedMessage: 'A new XP source has been added to this skill.',
      activityDeletedTitle: 'Activity deleted',
      activityDeletedMessage: 'The activity was removed from this skill.',
      unableCompleteTitle: 'Unable to complete activity',
      retryMessage: 'Please try again in a moment.'
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
    progress: {
      ratio: '{current} / {required} XP'
    },
    card: {
      defaultSkillDescription: 'Build momentum with repeatable activities and steady XP gains.'
    },
    toasts: {
      levelUp: 'Level up!',
      xpEarned: 'XP earned',
      leveledMessage: '{name} advanced to level {level}.',
      earnedMessage: 'You earned {xp} XP.',
      achievementUnlocked: 'Achievement unlocked'
    }
  },
  fa: {
    app: {
      subtitle: 'پیشرفت واقعی زندگی را به یک مسیر پایدار شبیه RPG تبدیل کن.',
      dashboard: 'داشبورد',
      skills: 'مهارت‌ها',
      english: 'English',
      persian: 'فارسی',
      close: 'بستن'
    },
    common: {
      xp: 'XP',
      level: 'سطح',
      today: 'امروز',
      activities: 'فعالیت',
      skill: 'مهارت',
      notFound: 'مهارت پیدا نشد.',
      optional: 'اختیاری'
    },
    dashboard: {
      yourSkills: 'مهارت‌های شما',
      tracksCopy: 'دسترسی سریع به مسیرهای رشد فعال شما.',
      newSkill: 'مهارت جدید',
      noSkills: 'هنوز مهارتی نداری. اولین مهارت را بساز تا حلقه پیشرفت شروع شود.',
      activityLog: 'گزارش فعالیت امروز',
      activityLogCopy: 'اقدام‌های اخیر و XP که تولید کرده‌اند.',
      noActivityLogs: 'برای شروع گزارش امروز، یک فعالیت را کامل کن.',
      achievements: 'دستاوردها',
      achievementsCopy: 'نقاط عطفی که با رشد سیستم باز می‌شوند.',
      noAchievements: 'با تکمیل فعالیت‌ها و رسیدن به نقاط عطف، دستاوردها نمایش داده می‌شوند.'
    },
    stats: {
      totalXp: 'XP کل',
      totalXpCopy: 'هر فعالیت کامل‌شده حساب شما را جلو می‌برد.',
      userLevel: 'سطح کاربر',
      userLevelCopy: 'نمایی کلی از مومنتوم فعلی شما در همه مهارت‌ها.',
      skills: 'مهارت‌ها',
      skillsCopy: 'حوزه‌هایی که به‌صورت فعال روی آن‌ها رشد می‌کنید.',
      completedToday: 'تکمیل‌شده امروز',
      completedTodayCopy: 'یک نگاه سریع به ثبات عملکرد امروز.'
    },
    skills: {
      title: 'مهارت‌ها',
      copy: 'مسیرهایی که رشدت را شکل می‌دهند بساز، ویرایش کن و بهینه کن.',
      createSkill: 'ساخت مهارت',
      updateSkill: 'به‌روزرسانی مهارت',
      open: 'باز کردن',
      delete: 'حذف',
      emptyDescription: 'یک مسیر پایدار برای پیشرفت بلندمدت.',
      createdTitle: 'مهارت ساخته شد',
      createdMessage: '{name} آماده دریافت XP است.',
      updatedTitle: 'مهارت به‌روزرسانی شد',
      updatedMessage: 'جزئیات مهارت با موفقیت ذخیره شد.',
      removedTitle: 'مهارت حذف شد',
      removedMessage: 'مهارت و فعالیت‌های آن حذف شدند.',
      createTitle: 'ساخت مهارت',
      createCopy: 'یک حوزه جدید تعریف کن تا به‌مرور سطح بگیری.',
      detailsLevelXp: 'سطح {level} - {xp} XP ذخیره‌شده'
    },
    activities: {
      editActivity: 'ویرایش فعالیت',
      addActivity: 'افزودن فعالیت',
      formCopy: 'فعالیت‌ها اقدام‌های تکرارشونده‌ای هستند که XP تولید می‌کنند.',
      updateActivity: 'به‌روزرسانی فعالیت',
      addActivityButton: 'افزودن فعالیت',
      cancelEditing: 'لغو ویرایش',
      listTitle: 'فعالیت‌ها',
      listCopy: 'کارها را کامل کن، XP بگیر و زنجیره را حفظ کن.',
      historyTitle: 'تاریخچه فعالیت',
      historyCopy: 'تکمیل‌های اخیر مرتبط با این مهارت.',
      emptyHistory: 'هنوز تاریخچه‌ای برای این مهارت ثبت نشده است. یک فعالیت کامل کن.',
      emptyList: 'هنوز فعالیتی ثبت نشده. یکی اضافه کن تا XP بگیری.',
      cooldown: 'کول‌داون {minutes} دقیقه',
      fallbackDescription: 'یک اقدام کوچک و تکرارشونده برای این مهارت.',
      complete: 'تکمیل',
      edit: 'ویرایش',
      activityUpdatedTitle: 'فعالیت به‌روزرسانی شد',
      activityUpdatedMessage: 'تغییرات فعالیت اعمال شد.',
      activityAddedTitle: 'فعالیت اضافه شد',
      activityAddedMessage: 'یک منبع جدید XP به این مهارت اضافه شد.',
      activityDeletedTitle: 'فعالیت حذف شد',
      activityDeletedMessage: 'فعالیت از این مهارت حذف شد.',
      unableCompleteTitle: 'تکمیل فعالیت ممکن نشد',
      retryMessage: 'چند لحظه دیگر دوباره تلاش کن.'
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
    progress: {
      ratio: '{current} / {required} XP'
    },
    card: {
      defaultSkillDescription: 'با فعالیت‌های تکرارشونده و XP پایدار مومنتوم بساز.'
    },
    toasts: {
      levelUp: 'ارتقای سطح!',
      xpEarned: 'XP دریافت شد',
      leveledMessage: '{name} به سطح {level} رسید.',
      earnedMessage: '{xp} XP دریافت کردی.',
      achievementUnlocked: 'دستاورد باز شد'
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
  const localeCookie = useCookie<Locale>('locale', {
    default: () => 'en'
  })
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

  const n = (value: number) =>
    new Intl.NumberFormat(locale.value === 'fa' ? 'fa-IR' : 'en-US').format(value)

  const d = (value: string | Date) =>
    new Intl.DateTimeFormat(locale.value === 'fa' ? 'fa-IR' : 'en-US', {
      dateStyle: 'medium',
      timeStyle: 'short'
    }).format(new Date(value))

  const setLocale = (value: Locale) => {
    locale.value = value
  }

  return {
    locale,
    isRtl,
    t,
    n,
    d,
    setLocale
  }
}
