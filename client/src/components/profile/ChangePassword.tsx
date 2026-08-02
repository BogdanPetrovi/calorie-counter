import { useEffect, useState } from "react"
import ModalContainer from "../shared/ui/ModalContainer"
import Submit from "../shared/ui/Submit"
import PasswordInput from "./ui/PasswordInput"
import apiConnection from "../../services/apiConnection"
import { useToast } from "../../context/ToastContext"
import { AxiosError } from "axios"

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
  const { showToast } = useToast();

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

  const handleSubmit = async () => {
    if(isDisabled) return

    try {
      const result = await apiConnection.post("/auth/change-password", { password: oldPassword, newPassword })
      if(result.status === 204){
        showToast('You successfully changed your password!')
        close()
      }
    } catch (error) {
      if(error instanceof AxiosError){
        setErrorInput(error.response?.data?.errorInput || 'confirm')
        setErrorMessage(error.response?.data?.message)
        return
      }

      console.log(error)
      showToast("We were unable to change your password, please try again")
      return
    }
  }

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
      <Submit handleSubmit={handleSubmit} isDisabled={isDisabled}  />
    </ModalContainer>
  )
}

export default ChangePassword