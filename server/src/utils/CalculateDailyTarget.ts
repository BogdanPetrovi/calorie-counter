import { SetupData } from '../types/SetupData.js';

const calculateDailyTargets = ({ gender, weight, height, dateOfBirth, activicyLevel, goal }: SetupData) => {
  const age = calculateAge(dateOfBirth)
  let firstFormulaResult = 10 * weight + 6.25 * height - 5 * age
  if(gender === 'Male') {
    firstFormulaResult = firstFormulaResult + 5
  }
  else {
    firstFormulaResult = firstFormulaResult - 161
  }

  const multiplierArray = [1.2, 1.375, 1.55, 1.725]
  const goalOptions = {lose: 0.88, maintain: 1, gain: 1.1}

  return ((firstFormulaResult * multiplierArray[activicyLevel]) * goalOptions[goal]).toFixed(0)
}

export default calculateDailyTargets

const calculateAge = (dateOfBirth: string) => {
  const today = new Date()
  const birthday = new Date(dateOfBirth)
  let age = today.getFullYear() - birthday.getFullYear()
  //To see if his birthday passed this year
  const monthSubstraction = today.getMonth() - birthday.getMonth()
  const daySubstraction = today.getDate() - birthday.getDate()

  if(monthSubstraction <= 0){
    //Check if birthday passed this month
    if(monthSubstraction === 0 && daySubstraction < 0){
      return age
    }
    age = age-1
  }

  return age
}
