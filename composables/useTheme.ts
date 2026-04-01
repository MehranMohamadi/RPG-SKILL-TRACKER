type ThemeMode = 'dark'

export const useTheme = () => {
  const themeCookie = useCookie<ThemeMode>('theme', {
    default: () => 'dark'
  })
  const theme = useState<ThemeMode>('theme', () => 'dark')

  watch(
    theme,
    (value) => {
      themeCookie.value = 'dark'
      if (value !== 'dark') {
        theme.value = 'dark'
      }
    },
    { immediate: true }
  )

  const setTheme = (value: ThemeMode) => {
    theme.value = 'dark'
  }

  return {
    theme,
    setTheme
  }
}
