import db from "../db/databaseConnect.js"

export const uploadUserData = async (req, res) => {
  const { gender, weight, height, dateOfBirth, activicyLevel, goal } = req.body
  const { id } = req.user

  if(!gender || !weight || !height || !dateOfBirth || !activicyLevel || !goal)
    return res.status(400).json({"message": 'Bad request'})

  const dailyCalories = calculateTargetDailyCalories(gender, weight, height, dateOfBirth, activicyLevel, goal)

  try {
    const result = await db.query(`INSERT INTO user_profiles(user_id, gender, weight_kg, height_cm, date_of_birth, activicy_level, target_daily_calories, goal)
                                  VALUES($1, $2, $3, $4, $5, $6, $7, $8)`, [id, gender, weight, height, dateOfBirth, activicyLevel, dailyCalories, goal]);
    return res.status(200).json({"message": "Success", "targetDailyCalories": dailyCalories})
  } catch (err) {
    console.log(err)
    return res.status(err.status || 500).json({"message": "Failed, please try again later"})
  }
}

const calculateTargetDailyCalories = (gender, weight, height, dateOfBirth, activicyLevel, goal) => {
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

const calculateAge = (dateOfBirth) => {
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