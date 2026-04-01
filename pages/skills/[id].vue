<template>
  <div v-if="skill" class="space-y-6">
    <LevelConfetti :show="showConfetti" />

    <section class="grid gap-6 xl:grid-cols-[1.1fr_0.9fr]">
      <div class="glass-card p-5 sm:p-6">
        <div class="mb-6 flex items-center gap-4">
          <div
            class="flex h-16 w-16 items-center justify-center rounded-3xl text-3xl"
            :style="{ background: `${skill.color}25` }"
          >
            <SkillIcon v-if="isSkillIconName(skill.icon)" :name="skill.icon" />
            <span v-else>{{ skill.icon }}</span>
          </div>
          <div>
            <h1 class="text-2xl font-semibold tracking-tight text-slate-100">
              {{ skill.name }}
            </h1>
            <p class="text-sm text-slate-400">
              Level {{ skill.level }} - {{ skill.xp }} XP banked
            </p>
          </div>
        </div>

        <div class="mb-6">
          <XpProgressBar
            :current-xp="skill.xp"
            :required-xp="skill.xpToNextLevel"
            :color="skill.color"
            :animated="animateProgress"
          />
        </div>

        <SkillForm
          :initial-value="{
            name: skill.name,
            icon: skill.icon,
            color: skill.color,
            description: skill.description
          }"
          submit-label="Update Skill"
          @submit="updateSkill"
        />
      </div>

      <div class="glass-card p-5 sm:p-6">
        <div class="mb-6">
          <h2 class="section-title">
            {{ editingActivityId ? 'Edit Activity' : 'Add Activity' }}
          </h2>
          <p class="section-copy">Activities are repeatable actions that generate XP.</p>
        </div>

        <ActivityForm
          :initial-value="activityFormValue"
          :submit-label="editingActivityId ? 'Update Activity' : 'Add Activity'"
          @submit="submitActivity"
        />

        <button
          v-if="editingActivityId"
          class="mt-3 text-sm font-medium text-slate-400 underline-offset-4 transition hover:text-slate-200 hover:underline"
          @click="resetActivityForm"
        >
          Cancel editing
        </button>
      </div>
    </section>

    <section class="glass-card p-5 sm:p-6">
      <div class="mb-6">
        <h2 class="section-title">Activities</h2>
        <p class="section-copy">Complete tasks, earn XP, and keep your streak alive.</p>
      </div>

      <ActivityList
        :activities="activities"
        @complete="completeActivity"
        @edit="startEdit"
        @delete="removeActivity"
      />
    </section>

    <section class="glass-card p-5 sm:p-6">
      <div class="mb-6">
        <h2 class="section-title">Activity History</h2>
        <p class="section-copy">Recent completions tied to this skill.</p>
      </div>

      <div class="space-y-3">
        <div
          v-for="log in skillLogs"
          :key="log.id"
          class="rounded-2xl border border-slate-700/70 bg-slate-900/50 p-4"
        >
          <div class="flex items-center justify-between gap-3">
            <div>
              <p class="font-medium text-slate-100">
                {{ log.subActivity?.name ?? log.activity?.name }}
              </p>
              <p class="text-sm text-slate-400">
                {{ log.subActivity ? `${log.activity?.name} - ${d(log.completedAt)}` : d(log.completedAt) }}
              </p>
            </div>
            <span class="rounded-full bg-emerald-500/20 px-3 py-1 text-sm font-semibold text-emerald-300">
              +{{ n(log.xpEarned) }} XP
            </span>
          </div>
        </div>

        <div
          v-if="skillLogs.length === 0"
          class="rounded-2xl border border-dashed border-slate-700 p-6 text-sm text-slate-400"
        >
          No history yet. Complete an activity to start the log.
        </div>
      </div>
    </section>
  </div>

  <div v-else class="glass-card p-6 text-sm text-slate-400">
    Skill not found.
  </div>
</template>

<script setup lang="ts">
import type { Activity } from '~/types'
import { isSkillIconName } from '~/composables/useSkillIcons'

const route = useRoute()
const skillsStore = useSkillsStore()
const activitiesStore = useActivitiesStore()
const xpStore = useXpStore()
const { push } = useToast()
const { d, n } = useI18n()
const highlightSkillId = useState<string | null>('highlight-skill-id', () => null)

const skillId = computed(() => String(route.params.id))
const editingActivityId = ref<string | null>(null)
const activityDraft = reactive({
  name: '',
  xpReward: 10,
  cooldown: null as number | null,
  description: '',
  subActivities: [] as Array<{
    name: string
    xpReward: number
  }>
})
const animateProgress = ref(false)
const showConfetti = ref(false)

await Promise.all([
  skillsStore.fetchSkills(),
  activitiesStore.fetchBySkill(skillId.value),
  xpStore.fetchDashboard()
])

const skill = computed(() => skillsStore.byId(skillId.value))
const activities = computed(() => activitiesStore.forSkill(skillId.value))
const skillLogs = computed(() =>
  xpStore.activityLogs.filter((log) => log.activity?.skill?.id === skillId.value).slice(0, 10)
)

const activityFormValue = computed(() => ({
  name: activityDraft.name,
  xpReward: activityDraft.xpReward,
  cooldown: activityDraft.cooldown,
  description: activityDraft.description,
  subActivities: activityDraft.subActivities
}))

const updateSkill = async (payload: {
  name: string
  icon: string
  color: string
  description?: string | null
}) => {
  if (!skill.value) {
    return
  }

  await skillsStore.updateSkill(skill.value.id, payload)
  push({
    title: 'Skill updated',
    message: 'Your skill details were saved.',
    tone: 'success'
  })
}

const resetActivityForm = () => {
  editingActivityId.value = null
  activityDraft.name = ''
  activityDraft.xpReward = 10
  activityDraft.cooldown = null
  activityDraft.description = ''
  activityDraft.subActivities = []
}

const startEdit = (activity: Activity) => {
  editingActivityId.value = activity.id
  activityDraft.name = activity.name
  activityDraft.xpReward = activity.xpReward
  activityDraft.cooldown = activity.cooldown
  activityDraft.description = activity.description ?? ''
  activityDraft.subActivities = activity.subActivities.map((item) => ({
    name: item.name,
    xpReward: item.xpReward
  }))
}

const submitActivity = async (payload: {
  name: string
  xpReward: number
  cooldown?: number | null
  description?: string | null
  subActivities?: Array<{
    name: string
    xpReward: number
  }>
}) => {
  if (editingActivityId.value) {
    await activitiesStore.updateActivity(editingActivityId.value, skillId.value, payload)
    push({
      title: 'Activity updated',
      message: 'The activity changes are now live.',
      tone: 'success'
    })
  } else {
    await activitiesStore.createActivity({
      ...payload,
      skillId: skillId.value
    })
    push({
      title: 'Activity added',
      message: 'A new XP source has been added to this skill.',
      tone: 'success'
    })
  }

  resetActivityForm()
}

const removeActivity = async (id: string) => {
  await activitiesStore.deleteActivity(id, skillId.value)
  push({
    title: 'Activity deleted',
    message: 'The activity was removed from this skill.',
    tone: 'info'
  })
}

const completeActivity = async (payload: { activityId?: string; subActivityId?: string }) => {
  try {
    const response = await xpStore.completeActivity(payload)
    highlightSkillId.value = skillId.value
    animateProgress.value = false

    await nextTick()
    animateProgress.value = true
    if (response.leveledUp) {
      showConfetti.value = true
    }

    setTimeout(() => {
      animateProgress.value = false
      highlightSkillId.value = null
      showConfetti.value = false
    }, 1100)

    push({
      title: response.leveledUp ? 'Level up!' : 'XP earned',
      message: response.leveledUp
        ? `${skill.value?.name} advanced to level ${response.skill.level}.`
        : `You earned ${response.activityLog.xpEarned} XP.`,
      tone: 'success'
    })

    for (const achievement of response.unlockedAchievements) {
      push({
        title: 'Achievement unlocked',
        message: achievement.achievement.title,
        tone: 'success'
      })
    }
  } catch (error) {
    push({
      title: 'Unable to complete activity',
      message: error instanceof Error ? error.message : 'Please try again in a moment.',
      tone: 'info'
    })
  }
}
</script>
