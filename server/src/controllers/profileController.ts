import { Request, Response } from 'express'
import calculateDailyTargets from '../utils/calculateDailyTarget.js'
import databaseConnect from '../db/databaseConnect.js'
import calculateBmi from '../utils/calculateBmi.js'

export const updateUserData = async (req: Request, res: Response) => {
  const user = req.user
  const { gender, weight, height, dateOfBirth, activicyLevel, goal } = req.body

  if(!gender || !weight || !height || !dateOfBirth || !activicyLevel || !goal)
    return res.status(400).json({"message": 'Bad request'})

  const dailyCalories = calculateDailyTargets({gender, weight, height, dateOfBirth, activicyLevel, goal})

  await databaseConnect.query(`
    UPDATE user_profiles
    SET gender = $1,
      height_cm = $2,
      date_of_birth = $3,
      activicy_level = $4,
      goal = $5,
      target_daily_calories = $6,
      updated_at = NOW()
    WHERE user_id = $7;
  `, [gender, height, dateOfBirth, activicyLevel, goal, dailyCalories, user?.id])

  return res.sendStatus(204)
}


export const bmiAndMemberSince = async (req: Request, res: Response) => {
  const user = req.user

  const heightAndWeight = await databaseConnect.query("SELECT height_cm::int, weight_kg::int FROM user_profiles WHERE user_id=$1;",[user?.id])
  const bmi = calculateBmi(heightAndWeight.rows[0].weight_kg, heightAndWeight.rows[0].height_cm)

  const memberSince = await databaseConnect.query("SELECT created_at FROM users WHERE id=$1;", [user?.id])
  const formatDate = Intl.DateTimeFormat('en-GB', {
    month: 'long',
    year: 'numeric'
  }).format(memberSince.rows[0].created_at)
  const currentDate = new Date()
  const months = currentDate.getMonth() - memberSince.rows[0].created_at.getMonth()

  return res.status(200).json({
    bmi,
    memberSince: {
      date: formatDate,
      months
    }
  })
}