<template>
  <div class="space-y-6">
    <DashboardStats
      :stats="xpStore.stats"
      :current-streak="streak.current"
      :longest-streak="streak.longest"
    />

    <section class="grid gap-6 xl:grid-cols-[1.4fr_0.9fr]">
      <div class="space-y-6">
        <div class="glass-card p-5">
          <div class="mb-4 flex items-center justify-between">
            <div>
              <h2 class="section-title">Active Skills</h2>
              <p class="section-copy">Minimal cards for your growth tracks.</p>
            </div>
            <NuxtLink
              to="/skills/create"
              class="rounded-2xl bg-blue-600 px-4 py-2 text-sm font-medium text-white transition hover:bg-blue-500"
            >
              New Skill
            </NuxtLink>
          </div>

          <div class="grid gap-4 lg:grid-cols-2">
            <SkillCard
              v-for="skill in skillsStore.skills"
              :key="skill.id"
              :skill="skill"
              :animated="highlightSkillId === skill.id"
            />
            <div
              v-if="skillsStore.skills.length === 0"
              class="rounded-3xl border border-dashed border-slate-700 p-8 text-sm text-slate-400"
            >
              No skills yet. Create your first skill to start earning XP.
            </div>
          </div>
        </div>

        <div class="glass-card p-5">
          <div class="mb-4">
            <h2 class="section-title">Recent Activity</h2>
            <p class="section-copy">Latest actions and XP gains.</p>
          </div>

          <div class="space-y-3">
            <div
              v-for="log in xpStore.activityLogs.slice(0, 8)"
              :key="log.id"
              class="rounded-2xl border border-slate-700/70 bg-slate-900/50 p-4"
            >
              <div class="flex items-center justify-between gap-3">
                <div>
                  <p class="font-medium text-slate-100">
                    {{ log.activity?.name }}
                  </p>
                  <p class="text-sm text-slate-400">
                    {{ log.activity?.skill?.name }} - {{ d(log.completedAt) }}
                  </p>
                </div>
                <span class="rounded-full bg-emerald-500/20 px-3 py-1 text-sm font-semibold text-emerald-300">
                  +{{ n(log.xpEarned) }} XP
                </span>
              </div>
            </div>

            <div
              v-if="xpStore.activityLogs.length === 0"
              class="rounded-2xl border border-dashed border-slate-700 p-6 text-sm text-slate-400"
            >
              No activity yet. Complete your first activity to populate this feed.
            </div>
          </div>
        </div>
      </div>

      <aside class="space-y-6">
        <div class="glass-card p-5">
          <div class="mb-4 flex items-center justify-between gap-3">
            <div>
              <h2 class="section-title">{{ t('app.achievements') }}</h2>
              <p class="section-copy">{{ t('achievements.subtitle') }}</p>
            </div>
            <NuxtLink to="/achievements" class="text-sm font-medium text-blue-400 hover:text-blue-300">
              {{ t('app.achievements') }}
            </NuxtLink>
          </div>

          <div class="space-y-3">
            <AchievementBadge
              v-for="item in latestUnlocked"
              :key="item.key"
              :icon="item.icon"
              :title="item.title"
              :description="item.description"
              :unlocked="true"
              :progress="100"
              :current="item.target"
              :target="item.target"
              :unlocked-at="item.unlockedAt"
            />

            <div
              v-if="latestUnlocked.length === 0"
              class="rounded-2xl border border-dashed border-slate-700 p-6 text-sm text-slate-400"
            >
              {{ t('achievements.unlockedCounter', { unlocked: 0, total: n(progress.length) }) }}
            </div>
          </div>
        </div>
      </aside>
    </section>
  </div>
</template>

<script setup lang="ts">
const skillsStore = useSkillsStore()
const xpStore = useXpStore()
const { d, n, t } = useI18n()
const highlightSkillId = useState<string | null>('highlight-skill-id', () => null)

await Promise.all([skillsStore.fetchSkills(), xpStore.fetchDashboard()])

const { progress, streak } = useAchievementSystem({
  achievements: computed(() => xpStore.achievements),
  logs: computed(() => xpStore.activityLogs),
  skills: computed(() => skillsStore.skills),
  totalXp: computed(() => xpStore.stats?.totalXp ?? 0)
})

const latestUnlocked = computed(() =>
  progress.value.filter((item) => item.unlocked).slice(0, 6)
)
</script>
