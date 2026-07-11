import Title from "../shared/ui/Title"
import { useEffect, useState } from "react"
import { HiLockClosed } from "react-icons/hi"
import Input from "../shared/ui/Input"
import Submit from "../shared/ui/Submit"
import { useUser } from "../../utils/useQuery/userQuery"
import ProfileContainer from "./ui/ProfileContainer"
import apiConnection from "../../services/apiConnection"
import { validateEmail } from "../../utils/validator"
import { useQueryClient } from "@tanstack/react-query"
import { useToast } from "../../context/ToastContext"

const PersonalInfo = () => {
  const { data, isPending } = useUser()
  const [name, setName] = useState(data!.name)
  const [email, setEmail] = useState(data!.email)
  const [isDisabled, setIsDisabled] = useState(true)
  const [error, setError] = useState<null | 'name' | 'email' | 'both'>(null)
  const queryClient = useQueryClient()
  const { showToast } = useToast()

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
  
  if(isPending || !data) return <></>

  const handleSubmit = async () => {
    if(isDisabled) return
    try {
      const result = await apiConnection.post('/auth/update-personal-info', {
        name,
        email
      })
      if(result.status === 204){
        queryClient.invalidateQueries({ queryKey: ['user'] })
        return showToast('You succesfuly changed personal info!', 'success')
      }
    } catch (err) {
      setName(data.name)
      setEmail(data.email)
      console.log(err)
      return showToast(`Changing personal info failed, try again!`, 'error')
    }
  }
  
  return (
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
      <div className="w-full py-2 flex rounded-lg justify-center items-center cursor-pointer bg-black/20 hover:bg-black/30 active:bg-black/40 duration-200">
        <HiLockClosed /> Change password
      </div>
      <Submit handleSubmit={handleSubmit} isDisabled={isDisabled} />
    </ProfileContainer>
  )
}

export default PersonalInfo