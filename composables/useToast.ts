export type ToastItem = {
  id: string
  title: string
  message: string
  tone?: 'success' | 'info'
}

export const useToast = () => {
  const toasts = useState<ToastItem[]>('toast-items', () => [])

  const push = (toast: Omit<ToastItem, 'id'>) => {
    const id = crypto.randomUUID()

    toasts.value.push({
      id,
      tone: 'info',
      ...toast
    })

    setTimeout(() => {
      toasts.value = toasts.value.filter((item) => item.id !== id)
    }, 3200)
  }

  const remove = (id: string) => {
    toasts.value = toasts.value.filter((item) => item.id !== id)
  }

  return {
    toasts,
    push,
    remove
  }
}
