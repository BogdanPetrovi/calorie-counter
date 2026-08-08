import Title from "../shared/ui/Title"
import { useEffect, useState } from "react"
import { HiLockClosed } from "react-icons/hi"
import Input from "../shared/ui/Input"
import Submit from "../shared/ui/Submit"
import { useUser } from "../../utils/api/hooks/userQuery"
import ProfileContainer from "./ui/ProfileContainer"
import { validateEmail } from "../../utils/validator"
import { useConfirm } from "../../context/ConfirmContext"
import ChangePassword from "./ChangePassword"
import ContainerLoading from "../shared/ui/ContainerLoading"
import useUpdatePersonalInfo from "../../utils/api/mutations/useUpdatePersonalInfo"

const PersonalInfo = () => {
  const { data, isPending } = useUser()
  const [name, setName] = useState(data!.name)
  const [email, setEmail] = useState(data!.email)
  const [isDisabled, setIsDisabled] = useState(true)
  const [isPassword, setIsPassword] = useState(false)
  const [error, setError] = useState<null | 'name' | 'email' | 'both'>(null)
  const { showConfirm, closeConfirm } = useConfirm()

  const { mutate, isPending: isMutatePending } = useUpdatePersonalInfo()

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

  const handleCancel = () => {
    setName(data!.name)
    setEmail(data!.email)
    closeConfirm()
  }

  const handleClick = () => {
    if(isDisabled) return
    showConfirm({
      title: 'Are you sure you want to change your personal info?',
      description: "Your name and email on file will be updated to the new values.",
      buttonColor: 'green',
      action: () => { 
        closeConfirm(); 
        mutate(
          { name, email },
          {
            onError: handleCancel
          }
        ); 
      },
      close: handleCancel
    })
  }
  
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