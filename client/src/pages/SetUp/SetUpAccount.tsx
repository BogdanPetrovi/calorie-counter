import axios from "axios"
import { useUser } from "../../utils/userQuery"
import { Navigate } from "react-router-dom"
import steps from "../../utils/steps"
import Start from "../../components/setup/Start"
import { type AdditionalUserData } from "../../types/userTypes"
import { useState } from "react"
import Gender from "../../components/setup/Gender"
import Weight from "../../components/setup/Weight"
import Height from "../../components/setup/Height"
import DateOfBirth from "../../components/setup/DateOfBirth"
import ActivicyLevel from "../../components/setup/ActivicyLevel"
import Goal from "../../components/setup/Goal"
import End from "../../components/setup/End"
import Loader from "../../components/general/Loader"

function SetUpAccount() {
  const { data: user, isPending, isError, error } = useUser()
  const [currentStep, setCurrentStep] = useState(0)
  const [userData, setUserData] = useState<AdditionalUserData>({
    gender: null,
    weight: null,
    height: null,
    dateOfBirth: null,
    activicyLevel: null,
    goal: null,
    targetDailyCalories: null,
    createdAt: null
  })

  if (isPending) 
    return <Loader />

  if (isError)
    if(axios.isAxiosError(error) && error.status === 401)
      return <Navigate to={'/login'} />

  if (!user) 
    return <Navigate to={'/login'} />

  if(user.targetDailyCalories)
    return <Navigate to={'/dashboard'} />

  const next = (item?: string, value?: string | number) => {
    //Start will not return either item or value
    if(item && value)
      setUserData(prev => ({ 
        ...prev, 
        [item]: value
      }))
      
    setCurrentStep(currentStep + 1)
  }

  switch(steps[currentStep]){
    case 'start':
      return <Start user={user} next={next} />

    case 'gender':
      return <Gender next={next} />

    case 'weight':
      return <Weight next={next} />

    case 'height':
      return <Height next={next} />

    case 'dateOfBirth':
      return <DateOfBirth next={next} />

    case 'activicyLevel':
      return <ActivicyLevel next={next} />

    case 'goal':
      return <Goal next={next} />

    case 'end': 
      return <End userData={userData} />
  }
}

export default SetUpAccount
