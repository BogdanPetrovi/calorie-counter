import { Request, Response } from 'express'
import db from "../db/databaseConnect.js";
import databaseConnect from '../db/databaseConnect.js';

export const addFoodEntry = async (req: Request, res: Response) => {
  const id = req.user?.id;
  const { foodName, calories, mealType, servingSize } = req.body;
  
  const result = await db.query('INSERT INTO food_entries(user_id, food_name, calories, meal_type, serving_size) VALUES ($1,$2,$3,$4, $5);', [id, foodName, calories, mealType, servingSize || null]);

  return res.status(201).json({ "message": "Success" });
}

export const changeMeal = async (req: Request, res: Response) => {
  const { id, mealType, foodName, calories, servingSize } = req.body;

  const result = await db.query(`
      UPDATE food_entries
      SET
        food_name = $1,
        meal_type = $2,
        calories = $3,
        serving_size = $4
      WHERE id = $5;
    `, [ foodName, mealType, calories, servingSize, id ])

  return res.sendStatus(204)
}

export const deleteMeal = async (req: Request, res: Response) => {
  const id = req.params.id

  const result = await databaseConnect.query("DELETE FROM food_entries WHERE id = $1;", [id])

  return res.sendStatus(204)
}

export const recentCalories = async (req: Request, res: Response) => {
  const id = req.user?.id;

  const todayResult = await db.query(`SELECT SUM(calories) AS today FROM food_entries WHERE user_id = $1 AND DATE(created_at) = CURRENT_DATE;`, [id])
  const yesterdayResult = await db.query(`SELECT SUM(calories) AS yesterday FROM food_entries WHERE user_id = $1 AND DATE(created_at) = CURRENT_DATE - 1;`, [id])

  return res.status(200).json({ today: todayResult.rows[0].today, yesterday: yesterdayResult.rows[0].yesterday })
}

export const recentMeals = async (req: Request, res: Response) => {
  const id = req.user?.id;

  const todayMeals = await db.query(
    `SELECT meal_type AS meal, SUM(calories) AS calories, STRING_AGG(food_name, ', ') AS foods
    FROM food_entries 
    WHERE user_id = $1 AND DATE(created_at) = CURRENT_DATE
    GROUP BY meal_type;
    `, [id]);
  const yesterdayMeals = await db.query(
    `SELECT meal_type AS meal, SUM(calories) AS calories, STRING_AGG(food_name, ', ') AS foods
    FROM food_entries 
    WHERE user_id = $1 AND DATE(created_at) = CURRENT_DATE - 1
    GROUP BY meal_type;
    `, [id])

  return res.status(200).json({ today: todayMeals.rows, yesterday: yesterdayMeals.rows })
}

export const weeklyStats = async (req: Request, res: Response) => {
  const id = req.user?.id;

  const result = await db.query(`
      SELECT to_char(d.day, 'Dy') AS day, COALESCE(SUM(calories), 0) AS calories
      FROM generate_series(
        CURRENT_DATE - 6,
        CURRENT_DATE,
        INTERVAL '1 DAY'
      ) AS d(day)
      LEFT JOIN food_entries
        ON date_trunc('day', created_at) = d.day
        AND user_id = $1
      GROUP BY d.day
      ORDER BY d.day;
    `, [id])

  return res.status(200).json({ stats: result.rows })
}