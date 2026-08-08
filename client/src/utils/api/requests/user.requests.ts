import apiConnection from "../../../services/apiConnection"
import { isDemo, withDelay } from "../demo"
import { updateMockPersonalInfo, updateMockPhysiqueAndGoal, updateMockWeight } from "../mocks/user.mock"

export const updatePersonalInfo = async(name: string, email: string) => {
  if(isDemo){
    updateMockPersonalInfo(name, email)
    return withDelay({ status: 204 })
  }

  return apiConnection.post('/auth/update-personal-info', {
    name,
    email
  })
}

export const updatePhysiqueAndGoal = (gender: string, weight: number, height: number, dateOfBirth: string, activicyLevel: number, goal: string) => {
  if(isDemo){
    updateMockPhysiqueAndGoal(gender, weight, height, dateOfBirth, activicyLevel, goal)
    return withDelay({ status: 204 })
  }

  return apiConnection.post('/profile/update-user-data', {
    gender,
    weight,
    height,
    dateOfBirth,
    activicyLevel,
    goal
  })
}


export const updateWeight = (weight: number) => {
  if(isDemo){
    updateMockWeight(weight)
    return withDelay({ status: 204 })
  }

  return apiConnection.post("/profile/log-weight", {
    weight
  })
}