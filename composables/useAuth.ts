import type { AuthUser } from '~/types'

type AuthPayload = {
  email: string
  password: string
  name?: string
}

export const useAuth = () => {
  const user = useState<AuthUser | null>('auth-user', () => null)
  const loading = useState<boolean>('auth-loading', () => false)
  const sessionToken = useCookie<string | null>('skillxp_session')

  const fetchSession = async () => {
    if (!sessionToken.value) {
      user.value = null
      return null
    }

    const response = await $fetch<{ user: AuthUser | null }>('/api/auth/session')
    user.value = response.user
    return response.user
  }

  const login = async (payload: AuthPayload) => {
    loading.value = true

    try {
      const response = await $fetch<{ user: AuthUser }>('/api/auth/login', {
        method: 'POST',
        body: {
          email: payload.email,
          password: payload.password
        }
      })

      user.value = response.user
      return response.user
    } finally {
      loading.value = false
    }
  }

  const register = async (payload: AuthPayload) => {
    loading.value = true

    try {
      const response = await $fetch<{ user: AuthUser }>('/api/auth/register', {
        method: 'POST',
        body: payload
      })

      user.value = response.user
      return response.user
    } finally {
      loading.value = false
    }
  }

  const logout = async () => {
    loading.value = true

    try {
      await $fetch('/api/auth/logout', {
        method: 'POST'
      })
      user.value = null
      sessionToken.value = null
    } finally {
      loading.value = false
    }
  }

  return {
    user,
    loading,
    sessionToken,
    fetchSession,
    login,
    register,
    logout
  }
}
