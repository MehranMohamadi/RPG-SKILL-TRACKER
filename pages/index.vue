<template>
  <div class="space-y-6 pb-10 sm:space-y-8 sm:pb-14">
    <LandingHero
      :badge="content.hero.badge"
      :title="content.hero.title"
      :description="content.hero.description"
      :primary-cta="content.hero.primaryCta"
      :secondary-cta="content.hero.secondaryCta"
      :preview-title="content.hero.previewTitle"
      :preview-subtitle="content.hero.previewSubtitle"
      :highlights="content.hero.highlights"
      :preview-cards="content.hero.previewCards"
    />

    <LandingMetrics :items="content.metrics" />

    <LandingFeatureGrid
      :eyebrow="content.features.eyebrow"
      :title="content.features.title"
      :description="content.features.description"
      :features="content.features.items"
    />

    <LandingPreview
      :eyebrow="content.preview.eyebrow"
      :title="content.preview.title"
      :description="content.preview.description"
      :side-title="content.preview.sideTitle"
      :side-points="content.preview.sidePoints"
      :timeline="content.preview.timeline"
      :cta-eyebrow="content.preview.ctaEyebrow"
      :cta-title="content.preview.ctaTitle"
      :cta-copy="content.preview.ctaCopy"
      :primary-label="content.preview.primaryLabel"
      :secondary-label="content.preview.secondaryLabel"
    />
  </div>
</template>

<script setup lang="ts">
const { locale } = useI18n()

const landingContent = {
  en: {
    seo: {
      title: 'SkillXP | Turn your habits into visible progress',
      description: 'A focused landing page for SkillXP: track skills, stack XP, unlock milestones, and build momentum across your life.'
    },
    hero: {
      badge: 'Personal growth, gamified',
      title: 'Level up your real life with a system that actually feels motivating.',
      description: 'SkillXP turns your daily effort into a clear loop of activities, XP, streaks, and achievements so your progress stops feeling invisible.',
      primaryCta: 'Open dashboard',
      secondaryCta: 'Create your first skill',
      previewTitle: 'Tonight\'s momentum board',
      previewSubtitle: 'A quick view of where your energy is compounding.',
      highlights: [
        {
          title: 'Track skills, not vague goals',
          copy: 'Break growth into repeatable actions you can finish in minutes.'
        },
        {
          title: 'See XP build daily',
          copy: 'Every completed activity adds visible progress instead of vague intention.'
        },
        {
          title: 'Stay hooked on consistency',
          copy: 'Streaks and achievements keep your next session obvious.'
        }
      ],
      previewCards: [
        {
          name: 'Programming',
          copy: 'Ship one focused feature before midnight.',
          badge: 'Level 7',
          badgeClass: 'bg-cyan-400/10 text-cyan-300',
          progress: '74%'
        },
        {
          name: 'Reading',
          copy: 'Finish 12 pages and lock in the streak.',
          badge: 'Streak x5',
          badgeClass: 'bg-amber-400/10 text-amber-300',
          progress: '48%'
        },
        {
          name: 'Fitness',
          copy: 'Complete a short mobility routine after work.',
          badge: 'Ready',
          badgeClass: 'bg-emerald-400/10 text-emerald-300',
          progress: '82%'
        }
      ]
    },
    metrics: [
      {
        value: '3 loops',
        label: 'Capture, complete, level up',
        copy: 'The product stays simple: define a skill, do the work, collect progress.'
      },
      {
        value: 'Daily',
        label: 'Momentum over intensity',
        copy: 'Designed for small wins that survive busy schedules and low-energy days.'
      },
      {
        value: 'Visible',
        label: 'Proof that you are improving',
        copy: 'Your dashboard, streaks, and achievements make effort tangible.'
      }
    ],
    features: {
      eyebrow: 'Why it works',
      title: 'Built to make growth easy to start and satisfying to sustain.',
      description: 'The app focuses on a few tight feedback loops instead of bloated productivity features, so your habits feel lighter and more rewarding.',
      items: [
        {
          icon: 'XP',
          title: 'XP-based motivation',
          copy: 'Each activity earns points, so your effort turns into immediate feedback.'
        },
        {
          icon: 'Lv',
          title: 'Level progression',
          copy: 'Skills can mature over time, making long-term growth feel alive.'
        },
        {
          icon: 'St',
          title: 'Streak awareness',
          copy: 'Consistency becomes something you can see, protect, and celebrate.'
        },
        {
          icon: 'Bad',
          title: 'Achievement milestones',
          copy: 'Unlock meaningful markers for first steps, volume, mastery, and exploration.'
        }
      ]
    },
    preview: {
      eyebrow: 'Inside the flow',
      title: 'From vague ambition to a daily system',
      description: 'SkillXP helps you decide what to do next, keeps the action small, and rewards follow-through.',
      sideTitle: 'What the experience gives you',
      sidePoints: [
        'A focused dashboard instead of a cluttered productivity wall.',
        'Small activity units that are easy to repeat and complete.',
        'A stronger sense of momentum when life feels scattered.'
      ],
      timeline: [
        {
          title: '1. Create a skill',
          copy: 'Pick something you genuinely want to improve, from coding to fitness to language practice.',
          badge: 'Setup'
        },
        {
          title: '2. Add repeatable actions',
          copy: 'Define activities with XP and cooldowns so your next move stays obvious.',
          badge: 'Routine'
        },
        {
          title: '3. Watch progress compound',
          copy: 'Complete actions, build streaks, and unlock achievements as your system tightens.',
          badge: 'Reward'
        }
      ],
      ctaEyebrow: 'Start now',
      ctaTitle: 'Your life already has the raw effort. This gives it a scoreboard.',
      ctaCopy: 'Open the app, create one skill, and let your next small action count for something visible.',
      primaryLabel: 'Go to dashboard',
      secondaryLabel: 'Browse skills'
    }
  },
  fa: {
    seo: {
      title: 'SkillXP | رشدت را قابل‌دیدن کن',
      description: 'لندینگ SkillXP برای تبدیل تلاش روزانه به XP، استریک، دستاورد و پیشرفت قابل‌مشاهده.'
    },
    hero: {
      badge: 'گیمیفای کردن رشد شخصی',
      title: 'زندگی واقعی‌ات را با سیستمی لول‌آپ کن که واقعاً انگیزه می‌دهد.',
      description: 'SkillXP تلاش روزانه‌ات را به یک چرخه‌ی شفاف از فعالیت، XP، استریک و دستاورد تبدیل می‌کند تا پیشرفتت دیگر نامرئی نباشد.',
      primaryCta: 'ورود به داشبورد',
      secondaryCta: 'ساخت اولین مهارت',
      previewTitle: 'برد امشب برای حفظ مومنتوم',
      previewSubtitle: 'یک نمای سریع از جاهایی که انرژیت در حال جمع شدن است.',
      highlights: [
        {
          title: 'مهارت را دنبال کن، نه هدف مبهم',
          copy: 'رشدت را به کارهای تکرارشونده و کوتاهی بشکن که واقعاً انجام می‌شوند.'
        },
        {
          title: 'XP را هر روز ببین',
          copy: 'هر فعالیت کامل‌شده به‌جای نیت مبهم، پیشرفت قابل‌مشاهده می‌سازد.'
        },
        {
          title: 'روی تداوم قفل بمان',
          copy: 'استریک و دستاوردها باعث می‌شوند قدم بعدی همیشه روشن باشد.'
        }
      ],
      previewCards: [
        {
          name: 'برنامه‌نویسی',
          copy: 'قبل از نیمه‌شب یک فیچر جمع‌وجور تحویل بده.',
          badge: 'سطح ۷',
          badgeClass: 'bg-cyan-400/10 text-cyan-300',
          progress: '74%'
        },
        {
          name: 'مطالعه',
          copy: '۱۲ صفحه بخوان و استریک را حفظ کن.',
          badge: 'استریک ۵',
          badgeClass: 'bg-amber-400/10 text-amber-300',
          progress: '48%'
        },
        {
          name: 'فیتنس',
          copy: 'بعد از کار یک روتین کوتاه موبیلیتی انجام بده.',
          badge: 'آماده',
          badgeClass: 'bg-emerald-400/10 text-emerald-300',
          progress: '82%'
        }
      ]
    },
    metrics: [
      {
        value: '۳ حلقه',
        label: 'ثبت، انجام، لول‌آپ',
        copy: 'محصول عمداً ساده مانده: مهارت بساز، کار را انجام بده، پیشرفت بگیر.'
      },
      {
        value: 'روزانه',
        label: 'مومنتوم مهم‌تر از شدت',
        copy: 'برای بردهای کوچک طراحی شده که در روزهای شلوغ هم دوام می‌آورند.'
      },
      {
        value: 'شفاف',
        label: 'مدرک واضح برای رشد تو',
        copy: 'داشبورد، استریک و دستاوردها تلاشت را قابل‌دیدن می‌کنند.'
      }
    ],
    features: {
      eyebrow: 'چرا جواب می‌دهد',
      title: 'برای شروع آسان و ادامه‌ی لذت‌بخشِ رشد ساخته شده.',
      description: 'به‌جای شلوغ کردن اپ با قابلیت‌های اضافه، روی چند فیدبک‌لوپ دقیق تمرکز می‌کند تا عادت‌ها سبک‌تر و رضایت‌بخش‌تر شوند.',
      items: [
        {
          icon: 'XP',
          title: 'انگیزه بر پایه XP',
          copy: 'هر فعالیت امتیاز می‌دهد و تلاش تو فوراً بازخورد می‌گیرد.'
        },
        {
          icon: 'Lv',
          title: 'پیشرفت سطحی',
          copy: 'مهارت‌ها با زمان رشد می‌کنند و حس پیشروی را زنده نگه می‌دارند.'
        },
        {
          icon: 'St',
          title: 'دیدن تداوم',
          copy: 'پیوستگی چیزی می‌شود که می‌توانی ببینی، حفظش کنی و جشن بگیری.'
        },
        {
          icon: 'Bad',
          title: 'دستاوردهای مرحله‌ای',
          copy: 'برای شروع، حجم، استادی و کشف‌کردن، مارکرهای معنی‌دار باز می‌کنی.'
        }
      ]
    },
    preview: {
      eyebrow: 'داخل جریان',
      title: 'از خواستنِ مبهم تا یک سیستم روزانه',
      description: 'SkillXP کمک می‌کند بدانی قدم بعدی چیست، آن را کوچک نگه داری و برای انجام دادنش پاداش بگیری.',
      sideTitle: 'این تجربه چه چیزی به تو می‌دهد',
      sidePoints: [
        'یک داشبورد متمرکز به‌جای دیوار شلوغ بهره‌وری.',
        'فعالیت‌های کوچک و تکرارشونده که راحت‌تر کامل می‌شوند.',
        'حس مومنتوم قوی‌تر وقتی زندگی پراکنده به‌نظر می‌رسد.'
      ],
      timeline: [
        {
          title: '۱. یک مهارت بساز',
          copy: 'چیزی را انتخاب کن که واقعاً می‌خواهی بهترش کنی؛ از کدنویسی تا فیتنس یا زبان.',
          badge: 'شروع'
        },
        {
          title: '۲. کارهای تکرارشونده تعریف کن',
          copy: 'برای هر فعالیت XP و کول‌داون بگذار تا قدم بعدی همیشه واضح بماند.',
          badge: 'روتین'
        },
        {
          title: '۳. انباشته شدن پیشرفت را ببین',
          copy: 'فعالیت‌ها را کامل کن، استریک بساز و با قوی‌تر شدن سیستمت دستاورد باز کن.',
          badge: 'پاداش'
        }
      ],
      ctaEyebrow: 'همین حالا شروع کن',
      ctaTitle: 'تلاش خام در زندگی‌ات از قبل هست؛ این فقط برایش اسکوربورد می‌سازد.',
      ctaCopy: 'اپ را باز کن، یک مهارت بساز و بگذار حرکت کوچک بعدی‌ات به یک پیشرفت واقعی تبدیل شود.',
      primaryLabel: 'رفتن به داشبورد',
      secondaryLabel: 'دیدن مهارت‌ها'
    }
  }
} as const

const content = computed(() => (locale.value === 'fa' ? landingContent.fa : landingContent.en))

useSeoMeta({
  title: () => content.value.seo.title,
  description: () => content.value.seo.description,
  ogTitle: () => content.value.seo.title,
  ogDescription: () => content.value.seo.description,
  twitterTitle: () => content.value.seo.title,
  twitterDescription: () => content.value.seo.description
})
</script>
