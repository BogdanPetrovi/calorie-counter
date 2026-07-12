import { Request, Response } from 'express'
import calculateDailyTargets from '../utils/calculateDailyTarget.js'
import databaseConnect from '../db/databaseConnect.js'

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
      target_daily_calories = $6
    WHERE user_id = $7;
  `, [gender, height, dateOfBirth, activicyLevel, goal, dailyCalories, user?.id])

  return res.sendStatus(204)
}