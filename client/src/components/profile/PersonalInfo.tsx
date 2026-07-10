import Title from "../shared/ui/Title"
import { useEffect, useState } from "react"
import { HiLockClosed } from "react-icons/hi"
import Input from "../shared/ui/Input"
import Submit from "../shared/ui/Submit"
import { useUser } from "../../utils/useQuery/userQuery"
import ProfileContainer from "./ui/ProfileContainer"

const PersonalInfo = () => {
  const { data, isPending } = useUser()
  const [name, setName] = useState(data!.name)
  const [email, setEmail] = useState(data!.email)
  const [isDisabled, setIsDisabled] = useState(true)

  useEffect(() => {
    if(data && data.name === name && data.email === email)
      return setIsDisabled(true)
    
    return setIsDisabled(false)    
  }, [data, name, email])
  
  if(isPending || !data) return <></>

  const handleSubmit = () => {
    return 
  }
  
  return (
    <ProfileContainer gap="gap-3.5">
      <Title name="Personal info" />
      <div className="w-full">
        <Input name="Full name" placeholder="John Doe" value={ name || '' } setValue={setName} type="text" />
      </div>
      <div className="w-full">
        <Input name="Email" placeholder="example@gmail.com" value={ email || '' } setValue={setEmail} type="text" />
      </div>
      <div className="w-full py-2 flex rounded-lg justify-center items-center cursor-pointer bg-black/20 hover:bg-black/30 active:bg-black/40 duration-200">
        <HiLockClosed /> Change password
      </div>
      <Submit handleSubmit={handleSubmit} isDisabled={isDisabled} />
    </ProfileContainer>
  )
}

export default PersonalInfo