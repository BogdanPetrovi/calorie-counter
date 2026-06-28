export interface Toast {
  message: string
  type?: 'success' | 'error'
  duration?: number
}

export interface ToastProps extends Toast {
  onClose: () => void
}

export interface ToastWithShow extends Toast {
  show: boolean
}