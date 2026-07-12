import { Request, Response } from 'express'
import db from "../db/databaseConnect.js"
import calculateDailyTargets from '../utils/calculateDailyTarget.js';

export const uploadUserData = async (req: Request, res: Response) => {
  const id = req.user?.id;
  const { gender, weight, height, dateOfBirth, activicyLevel, goal } = req.body

  if(!gender || !weight || !height || !dateOfBirth || !activicyLevel || !goal)
    return res.status(400).json({"message": 'Bad request'})

  const dailyCalories = calculateDailyTargets({gender, weight, height, dateOfBirth, activicyLevel, goal})

  await db.transaction(async (client) => {
    await client.query(
      `INSERT INTO user_profiles(user_id, gender, weight_kg, height_cm, date_of_birth, activicy_level, target_daily_calories, goal)
      VALUES($1, $2, $3, $4, $5, $6, $7, $8)`, 
    [id, gender, weight, height, dateOfBirth, activicyLevel, dailyCalories, goal])

    await client.query('INSERT INTO weight_updates (user_id, weight) VALUES ($1,$2);', [id, weight])
  })

  return res.status(200).json({"message": "Success", "targetDailyCalories": dailyCalories})
}