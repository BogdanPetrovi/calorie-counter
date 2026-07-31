import { createContext, useContext, useState, useCallback, type ReactNode } from "react"
import type ConfirmProps from "../types/confirmPropsTypes"
import Confirm from "../components/shared/Confirm"
type ShowConfirmArgs = Omit<ConfirmProps, 'isActive'>

interface ConfirmContextValue {
  showConfirm: (args: ShowConfirmArgs) => void
  closeConfirm: () => void
}

const ConfirmContext = createContext<ConfirmContextValue | undefined>(undefined)

export const ConfirmProvider = ({ children }: { children: ReactNode }) => {
  const [confirm, setConfirm] = useState<ConfirmProps>({
    title: '',
    description: '',
    buttonColor: 'green',
    buttonText: 'Confirm',
    action: () => {}, 
    close: () => {},
    isActive: false
  })

  const closeConfirm = useCallback(() => {
    setConfirm(prev => ({ ...prev, isActive: false }))
  }, [])

  const showConfirm = useCallback(({ title, description, buttonColor, buttonText, action, close }: ConfirmProps) => {
    setConfirm({ 
      title, 
      description,
      buttonColor, 
      buttonText, 
      action, 
      close: () => {
        close?.()
        closeConfirm()
      }, 
      isActive: true })
  }, [closeConfirm])

  console.log(confirm.isActive)

  return (
    <ConfirmContext.Provider value={{ showConfirm, closeConfirm }}>
      {children}
      {confirm.isActive && (
        <Confirm
          title={confirm.title}
          description={confirm.description}
          buttonColor={confirm.buttonColor}
          buttonText={confirm.buttonText}
          action={confirm.action}
          close={confirm.close}
        />
      )}
    </ConfirmContext.Provider>
  )
}

// eslint-disable-next-line react-refresh/only-export-components
export const useConfirm = () => {
  const context = useContext(ConfirmContext)
  if (!context) {
    throw new Error("useConfirm must be used inside provider")
  }
  return context
}