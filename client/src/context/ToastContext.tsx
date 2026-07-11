import { createContext, useContext, useState, useCallback, type ReactNode } from "react"
import Toast from "../components/shared/Toast"
import type { ToastType, ToastWithShow } from "../types/toastTypes"

interface ToastContextValue {
  showToast: (message: string, type?: ToastType, duration?: number) => void
}

const ToastContext = createContext<ToastContextValue | undefined>(undefined)

export const ToastProvider = ({ children }: { children: ReactNode }) => {
  const [toast, setToast] = useState<ToastWithShow>({
    message: "",
    type: "success",
    show: false,
  })
  const [duration, setDuration] = useState(6000)

  const showToast = useCallback((message: string, type: ToastType = "success", duration = 6000) => {
    setToast({ message, type, show: true })
    setDuration(duration)
  }, [])

  const handleClose = useCallback(() => {
    setToast((prev) => ({ ...prev, show: false }))
  }, [])

  return (
    <ToastContext.Provider value={{ showToast }}>
      {children}
      {toast.show && (
        <Toast
          message={toast.message}
          type={toast.type}
          duration={duration}
          onClose={handleClose}
        />
      )}
    </ToastContext.Provider>
  )
}

// eslint-disable-next-line react-refresh/only-export-components
export const useToast = () => {
  const context = useContext(ToastContext)
  if (!context) {
    throw new Error("useToast mora da se koristi unutar ToastProvider-a")
  }
  return context
}