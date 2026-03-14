<template>
  <svg
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    class="h-6 w-6"
    stroke="currentColor"
    stroke-width="1.8"
    stroke-linecap="round"
    stroke-linejoin="round"
    aria-hidden="true"
  >
    <path v-if="name === 'star'" d="M12 3.5L14.8 9.2L21 10L16.5 14.3L17.7 20.5L12 17.3L6.3 20.5L7.5 14.3L3 10L9.2 9.2L12 3.5Z" />

    <path v-else-if="name === 'code'" d="M8 8L4 12L8 16M16 8L20 12L16 16M14 5L10 19" />

    <path v-else-if="name === 'book'" d="M6 5.5H16C17.7 5.5 19 6.8 19 8.5V18.5H9C7.3 18.5 6 17.2 6 15.5V5.5Z" />
    <path v-else-if="name === 'book'" d="M6 8.5C6 6.8 7.3 5.5 9 5.5H19" />

    <path v-else-if="name === 'brain'" d="M9 8.5C9 6.6 10.6 5 12.5 5C14.4 5 16 6.6 16 8.5V10.2C17.2 10.8 18 12 18 13.4C18 15.1 16.6 16.5 14.9 16.5H9.1C7.4 16.5 6 15.1 6 13.4C6 12 6.8 10.8 8 10.2V8.5" />
    <path v-else-if="name === 'brain'" d="M12 8V16.5M9.5 10.8H14.5" />

    <circle v-else-if="name === 'target'" cx="12" cy="12" r="7" />
    <circle v-else-if="name === 'target'" cx="12" cy="12" r="3.2" />
    <path v-else-if="name === 'target'" d="M12 2.5V5.2M12 18.8V21.5M2.5 12H5.2M18.8 12H21.5" />

    <path v-else-if="name === 'dumbbell'" d="M3.5 10V14M6.5 9V15M17.5 9V15M20.5 10V14M6.5 12H17.5" />

    <path v-else-if="name === 'heart'" d="M12 20C12 20 4.5 15.5 4.5 10.2C4.5 7.9 6.4 6 8.7 6C10.2 6 11.5 6.8 12 8C12.5 6.8 13.8 6 15.3 6C17.6 6 19.5 7.9 19.5 10.2C19.5 15.5 12 20 12 20Z" />

    <path v-else-if="name === 'music'" d="M10 17.3C10 18.8 8.8 20 7.3 20C5.8 20 4.6 18.8 4.6 17.3C4.6 15.8 5.8 14.6 7.3 14.6C8.8 14.6 10 15.8 10 17.3ZM10 17.3V6.7L18.5 5V14.5" />
    <circle v-else-if="name === 'music'" cx="17.2" cy="16.8" r="2.7" />

    <rect v-else-if="name === 'camera'" x="3.5" y="7" width="17" height="12" rx="2.5" />
    <circle v-else-if="name === 'camera'" cx="12" cy="13" r="3.2" />
    <path v-else-if="name === 'camera'" d="M8.3 7L9.6 4.8H14.4L15.7 7" />

    <rect v-else-if="name === 'briefcase'" x="3.5" y="7.5" width="17" height="11" rx="2" />
    <path v-else-if="name === 'briefcase'" d="M9 7.5V6.4C9 5.6 9.6 5 10.4 5H13.6C14.4 5 15 5.6 15 6.4V7.5M3.5 12.3H20.5" />

    <circle v-else-if="name === 'globe'" cx="12" cy="12" r="8.5" />
    <path v-else-if="name === 'globe'" d="M3.8 12H20.2M12 3.5C14.5 5.8 16 8.8 16 12C16 15.2 14.5 18.2 12 20.5C9.5 18.2 8 15.2 8 12C8 8.8 9.5 5.8 12 3.5" />

    <path v-else-if="name === 'palette'" d="M12 4C7.3 4 3.5 7.6 3.5 12.2C3.5 15.9 6.5 19 10.3 19H11.8C13.1 19 14.1 17.9 14.1 16.7C14.1 15.8 14.8 15.1 15.7 15.1H16.8C19.9 15.1 22.5 12.6 22.5 9.5C22.5 6.5 19.8 4 16.8 4H12Z" />
    <circle v-else-if="name === 'palette'" cx="8.2" cy="10" r="1.1" />
    <circle v-else-if="name === 'palette'" cx="11.7" cy="8.5" r="1.1" />
    <circle v-else-if="name === 'palette'" cx="15.2" cy="9.5" r="1.1" />

    <rect v-else-if="name === 'gamepad'" x="3.5" y="9.5" width="17" height="8.5" rx="4.2" />
    <path v-else-if="name === 'gamepad'" d="M8.2 13.7H10.9M9.55 12.35V15.05M15.4 13.1H15.42M17.4 14.4H17.42" />

    <path v-else-if="name === 'pen'" d="M5 17.8L4.2 20L6.4 19.2L17.8 7.8L16.4 6.4L5 17.8Z" />
    <path v-else-if="name === 'pen'" d="M14.9 5.1L16.3 3.7L20.3 7.7L18.9 9.1" />

    <rect v-else-if="name === 'mic'" x="9" y="4" width="6" height="10" rx="3" />
    <path v-else-if="name === 'mic'" d="M6.5 11.5V12C6.5 15 8.9 17.5 12 17.5C15.1 17.5 17.5 15 17.5 12V11.5M12 17.5V20" />

    <path v-else-if="name === 'rocket'" d="M13 3.5C16.5 3.9 19.9 7.2 20.3 10.7C17.8 12.2 15.5 14.5 14 17C10.5 16.6 7.1 13.3 6.7 9.8C9.2 8.3 11.5 6 13 3.5Z" />
    <path v-else-if="name === 'rocket'" d="M10.2 13.8L7.2 16.8M12.6 16.2L9.6 19.2M6.1 10.2L3.8 8.8L8.8 3.8L10.2 6.1" />
  </svg>
</template>

<script setup lang="ts">
import type { SkillIconName } from '~/composables/useSkillIcons'

defineProps<{
  name: SkillIconName
}>()
</script>
