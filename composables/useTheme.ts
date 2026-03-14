type ThemeMode = 'dark' | 'light'

export const useTheme = () => {
  const themeCookie = useCookie<ThemeMode>('theme', {
    default: () => 'dark'
  })
  const theme = useState<ThemeMode>('theme', () => themeCookie.value ?? 'dark')

  watch(
    theme,
    (value) => {
      themeCookie.value = value
    },
    { immediate: true }
  )

  const setTheme = (value: ThemeMode) => {
    theme.value = value
  }

  return {
    theme,
    setTheme
  }
}
