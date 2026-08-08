import Title from "../shared/ui/Title"
import { useCallback, useEffect, useState } from "react"
import { HiLockClosed } from "react-icons/hi"
import Input from "../shared/ui/Input"
import Submit from "../shared/ui/Submit"
import { useUser } from "../../utils/api/hooks/userQuery"
import ProfileContainer from "./ui/ProfileContainer"
import { validateEmail } from "../../utils/validator"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { useToast } from "../../context/ToastContext"
import { useConfirm } from "../../context/ConfirmContext"
import { AxiosError } from "axios"
import ChangePassword from "./ChangePassword"
import { updatePersonalInfo } from "../../utils/api/requests/user.requests"
import ContainerLoading from "../shared/ui/ContainerLoading"

const PersonalInfo = () => {
  const { data, isPending } = useUser()
  const [name, setName] = useState(data!.name)
  const [email, setEmail] = useState(data!.email)
  const [isDisabled, setIsDisabled] = useState(true)
  const [isPassword, setIsPassword] = useState(false)
  const [error, setError] = useState<null | 'name' | 'email' | 'both'>(null)
  const queryClient = useQueryClient()
  const { showToast } = useToast()
  const { showConfirm, closeConfirm } = useConfirm()

  const { mutate, isPending: isMutatePending } = useMutation({
    mutationFn: () => updatePersonalInfo(name, email),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['user'] })
      showToast('You succesfuly changed personal info!', 'success')
    },
    onError: (err) => {
      if(err instanceof AxiosError){
        setName(data!.name)
        setEmail(data!.email)
        closeConfirm()
        showToast(err.response?.data.message || err.message, 'error')
      }
      showToast(`Changing personal info failed, try again!`, 'error')
    }
  })

  useEffect(() => {
    if(data && data.name === name && data.email === email)
      return setIsDisabled(true)
    if(name === ''){
      if(!validateEmail(email)){
        setError('both')
      } else {
        setError('name')
      }
      return setIsDisabled(true)
    }
    if(!validateEmail(email)){
      setIsDisabled(true)
      return setError('email')
    }
    
    setError(null)
    return setIsDisabled(false)    
  }, [data, name, email])

  const handleCancel = useCallback(() => {
    setName(data!.name)
    setEmail(data!.email)
    closeConfirm()
  }, [data, closeConfirm])

  const handleClick = useCallback(() => {
    if(isDisabled) return
    showConfirm({
      title: 'Are you sure you want to change your personal info?',
      description: "Your name and email on file will be updated to the new values.",
      buttonColor: 'green',
      action: () => { closeConfirm(); mutate(); },
      close: handleCancel
    })
  }, [isDisabled, showConfirm, mutate, handleCancel, closeConfirm])
  
  if(isPending) return (
    <ContainerLoading request="get" title="Personal info" containerType="profile" />
  )

  if(isMutatePending) return (
    <ContainerLoading request="post" title="Personal info" containerType="profile" />
  )
  
  if(!data) return <></>

  return (
    <>
      <ProfileContainer additionalStyles="gap-3.5">
        <Title name="Personal info" />
        <div className="w-full">
          <Input 
            name="Full name" 
            placeholder="John Doe" 
            value={ name || '' } 
            setValue={setName} 
            type="text" 
            borderColor={ error === 'name' || error === 'both' ? 'border-red-600' : 'border-green-600' }  
          />
        </div>
        <div className="w-full">
          <Input 
            name="Email" 
            placeholder="example@gmail.com" 
            value={ email || '' } 
            setValue={setEmail} 
            type="text" 
            borderColor={ error === 'email' || error === 'both' ? 'border-red-600' : 'border-green-600' }  
          />
        </div>
        <div 
          className="w-full py-2 flex rounded-lg justify-center items-center cursor-pointer bg-black/20 dark:bg-white/20 hover:bg-black/30 dark:hover:bg-white/30 active:bg-black/40 dark:active:bg-white/40 duration-200"
          onClick={() => setIsPassword(true)}
        >
          <HiLockClosed /> Change password
        </div>
        <Submit handleSubmit={handleClick} isDisabled={isDisabled} />
      </ProfileContainer>
      {
        isPassword &&
          <ChangePassword
            close={ () => setIsPassword(false) }
          /> 
      }
    </>
  )
}

export default PersonalInfo