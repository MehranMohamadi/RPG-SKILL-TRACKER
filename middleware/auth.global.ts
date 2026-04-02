export default defineNuxtRouteMiddleware((to) => {
  const publicRoutes = new Set(['/', '/login'])
  const sessionToken = useCookie<string | null>('skillxp_session')

  if (publicRoutes.has(to.path)) {
    if (to.path === '/login' && sessionToken.value) {
      return navigateTo('/dashboard')
    }

    return
  }

  if (!sessionToken.value) {
    const redirect = to.fullPath && to.fullPath !== '/' ? `?redirect=${encodeURIComponent(to.fullPath)}` : ''
    return navigateTo(`/login${redirect}`)
  }
})
