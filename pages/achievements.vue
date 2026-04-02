<template>
  <div class="space-y-6">
    <section class="glass-card p-5">
      <div class="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <h1 class="section-title">{{ t('achievements.title') }}</h1>
          <p class="section-copy">{{ t('achievements.subtitle') }}</p>
        </div>
        <div class="rounded-2xl bg-slate-900/70 px-4 py-2 text-sm text-slate-300">
          {{ t('achievements.unlockedCounter', { unlocked: n(unlockedCount), total: n(totalCount) }) }}
        </div>
      </div>
    </section>

    <section class="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
      <div class="glass-card p-5">
        <p class="text-sm text-slate-400">{{ t('achievements.currentStreak') }}</p>
        <p class="mt-2 text-2xl font-semibold text-slate-100">{{ n(streak.current) }} {{ t('common.days') }}</p>
      </div>
      <div class="glass-card p-5">
        <p class="text-sm text-slate-400">{{ t('achievements.bestStreak') }}</p>
        <p class="mt-2 text-2xl font-semibold text-slate-100">{{ n(streak.longest) }} {{ t('common.days') }}</p>
      </div>
      <div class="glass-card p-5">
        <p class="text-sm text-slate-400">{{ t('achievements.totalXp') }}</p>
        <p class="mt-2 text-2xl font-semibold text-slate-100">{{ n(xpStore.stats?.totalXp ?? 0) }}</p>
      </div>
      <div class="glass-card p-5">
        <p class="text-sm text-slate-400">{{ t('achievements.completedActivities') }}</p>
        <p class="mt-2 text-2xl font-semibold text-slate-100">{{ n(xpStore.activityLogs.length) }}</p>
      </div>
    </section>

    <section
      v-for="section in sections"
      :key="section.key"
      class="glass-card p-5"
    >
      <div class="mb-4 flex items-center justify-between gap-3">
        <h2 class="section-title">{{ section.label }}</h2>
        <span class="text-xs text-slate-400">
          {{ t('achievements.sectionProgress', {
            done: n(section.items.filter((item) => item.unlocked).length),
            total: n(section.items.length)
          }) }}
        </span>
      </div>

      <div class="grid gap-3 sm:grid-cols-2 xl:grid-cols-3">
        <AchievementBadge
          v-for="item in section.items"
          :key="item.key"
          :icon="item.icon"
          :image="item.image"
          :title="item.title"
          :description="item.description"
          :unlocked="item.unlocked"
          :progress="item.progress"
          :current="item.current"
          :target="item.target"
          :unlocked-at="item.unlockedAt"
        />
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
const xpStore = useXpStore()
const skillsStore = useSkillsStore()
const { n, t } = useI18n()

if (!skillsStore.skills.length) {
  void skillsStore.fetchSkills()
}

if (!xpStore.stats && xpStore.activityLogs.length === 0 && xpStore.achievements.length === 0) {
  void xpStore.fetchDashboard()
}

const { categories, progress, streak } = useAchievementSystem({
  achievements: computed(() => xpStore.achievements),
  logs: computed(() => xpStore.activityLogs),
  skills: computed(() => skillsStore.skills),
  totalXp: computed(() => xpStore.stats?.totalXp ?? 0)
})

const sections = computed(() =>
  Object.entries(categories.value).map(([key, items]) => ({
    key,
    label:
      key === 'beginner'
        ? t('achievements.sectionBeginner')
        : key === 'consistency'
          ? t('achievements.sectionConsistency')
          : key === 'xp'
            ? t('achievements.sectionXp')
            : key === 'skill'
              ? t('achievements.sectionSkill')
              : key === 'activity'
                ? t('achievements.sectionActivity')
                : key === 'explorer'
                  ? t('achievements.sectionExplorer')
                  : key,
    items
  }))
)

const totalCount = computed(() => progress.value.length)
const unlockedCount = computed(() => progress.value.filter((item) => item.unlocked).length)
</script>
