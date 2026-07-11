export interface Toast {
  message: string
  type?: ToastType
  duration?: number
}

export type ToastType = 'success' | 'error'

export interface ToastProps extends Toast {
  onClose: () => void
}

export interface ToastWithShow extends Toast {
  show: boolean
}