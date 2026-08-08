import { useEffect, useState } from "react"
import ModalContainer from "../shared/ui/ModalContainer"
import Submit from "../shared/ui/Submit"
import PasswordInput from "./ui/PasswordInput"
import { AxiosError } from "axios"
import useChangePassword from "../../utils/api/mutations/useChangePassword"

interface ChangePasswordProps {
  close: () => void
}

const ChangePassword = ({ close }: ChangePasswordProps) => {
  const [oldPassword, setOldPassword] = useState('')
  const [newPassword, setNewPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [errorInput, setErrorInput] = useState<'old' | 'new' | 'confirm' | ''>('')
  const [errorMessage, setErrorMessage] = useState('')
  const [isDisabled, setIsDisabled] = useState(true)

  const { mutate, isPending: isMutatePending } = useChangePassword()

  useEffect(() => {
    if(!oldPassword || !newPassword || !confirmPassword){
      return setIsDisabled(true)
    }

    if(newPassword.length < 8){
      setIsDisabled(true)
      setErrorMessage('Please enter a password with at least 8 characters')
      return setErrorInput('new')
    }

    if(newPassword === oldPassword){
      setIsDisabled(true)
      setErrorMessage('New password must be different from current password')
      return setErrorInput('new')
    }

    if(newPassword !== confirmPassword){
      setIsDisabled(true)
      setErrorMessage('New password does not match. Enter new password again here')
      return setErrorInput('confirm')
    }

    setErrorInput('')
    setErrorMessage('')
    return setIsDisabled(false)
  }, [oldPassword, newPassword, confirmPassword])

  if(isMutatePending) return (
    <ModalContainer close={ close } title="Change password">
      <h4 className="animate-pulse text-lg">Processing your request...</h4>
    </ModalContainer> 
  )

  return (
    <ModalContainer close={close} title="Change password">
      <PasswordInput
        name="Current password"
        value={oldPassword}
        setValue={setOldPassword}
        borderColor={ errorInput === 'old' ? 'border-red-600' : 'border-green-600' }
        errorText={ errorInput === 'old' ? errorMessage : '' }
      />
      <PasswordInput
        name="New password"
        value={newPassword}
        setValue={setNewPassword}
        borderColor={ errorInput === 'new' ? 'border-red-600' : 'border-green-600' }
        errorText={ errorInput === 'new' ? errorMessage : '' }
      />
      <PasswordInput
        name="Confirm new password"
        value={confirmPassword}
        setValue={setConfirmPassword}
        borderColor={ errorInput === 'confirm' ? 'border-red-600' : 'border-green-600' }
        errorText={ errorInput === 'confirm' ? errorMessage : '' }
      />
      <Submit 
        handleSubmit={() => {
          mutate(
            { password: oldPassword, newPassword },
            {
              onSuccess: () => close(),
              onError: (err) => {
                if(!(err instanceof AxiosError)) return

                setErrorInput(err.response?.data?.errorInput || 'confirm')
                setErrorMessage(err.response?.data?.message)
              }
            }
          )
        }}
        isDisabled={isDisabled}  
      />
    </ModalContainer>
  )
}

export default ChangePassword