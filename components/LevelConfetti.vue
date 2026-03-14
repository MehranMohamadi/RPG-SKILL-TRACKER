<template>
  <div v-if="show" class="pointer-events-none fixed inset-0 z-[60] overflow-hidden">
    <span
      v-for="piece in pieces"
      :key="piece.id"
      class="absolute top-0 block h-2 w-2 rounded-sm"
      :style="{
        left: `${piece.left}%`,
        background: piece.color,
        transform: `rotate(${piece.rotate}deg)`,
        animation: `confetti-fall ${piece.duration}ms ease-out forwards`,
        animationDelay: `${piece.delay}ms`
      }"
    />
  </div>
</template>

<script setup lang="ts">
const props = defineProps<{
  show: boolean
}>()

const palette = ['#2563EB', '#38BDF8', '#14B8A6', '#22C55E', '#F59E0B', '#F43F5E']

const pieces = computed(() =>
  Array.from({ length: 36 }).map((_, index) => ({
    id: index,
    left: Math.random() * 100,
    rotate: Math.round(Math.random() * 280),
    duration: 900 + Math.round(Math.random() * 700),
    delay: Math.round(Math.random() * 240),
    color: palette[index % palette.length]
  }))
)
</script>

<style scoped>
@keyframes confetti-fall {
  0% {
    opacity: 0;
    transform: translateY(-10vh) rotate(0deg);
  }

  10% {
    opacity: 1;
  }

  100% {
    opacity: 0;
    transform: translateY(100vh) rotate(380deg);
  }
}
</style>
