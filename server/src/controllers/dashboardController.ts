import { Request, Response } from 'express'
import db from "../db/databaseConnect.js";

export const addFoodEntry = async (req: Request, res: Response) => {
  const id = req.user?.id;
  const { foodName, calories, mealType, servingSize } = req.body;
  
  const result = await db.query('INSERT INTO food_entries(user_id, food_name, calories, meal_type, serving_size) VALUES ($1,$2,$3,$4, $5);', [id, foodName, calories, mealType, servingSize || null]);

  return res.status(201).json({ "message": "Success" });
}

export const recentCalories = async (req: Request, res: Response) => {
  const id = req.user?.id;

  const todayResult = await db.query(`SELECT SUM(calories) AS today FROM food_entries WHERE user_id = $1 AND DATE(created_at) = CURRENT_DATE;`, [id])
  const yesterdayResult = await db.query(`SELECT SUM(calories) AS yesterday FROM food_entries WHERE user_id = $1 AND DATE(created_at) = CURRENT_DATE - 1;`, [id])

  return res.status(200).json({ today: todayResult.rows[0].today, yesterday: yesterdayResult.rows[0].yesterday })
}