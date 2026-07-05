import { Request, Response } from "express"
import databaseConnect from "../db/databaseConnect.js"

export const historyStats = async (req: Request, res: Response) => {
  const user = req.user

  const [streak, averageMeal, mostEatenFood] = await Promise.all([
    databaseConnect.query(`
        WITH dates AS (
          SELECT DISTINCT created_at::date AS entry_date
          FROM food_entries
          WHERE user_id = $1
        ),
        grouped AS (
          SELECT 
            entry_date,
            entry_date - (ROW_NUMBER() OVER (ORDER BY entry_date))::int AS grp
          FROM dates
        ),
        streaks AS (
          SELECT 
            grp, 
            COUNT(*) AS streak_length,
            MIN(entry_date) AS first_date,
            MAX(entry_date) AS last_date  
          FROM grouped
          GROUP BY grp
        )
        SELECT COALESCE(
          (SELECT streak_length
           FROM streaks
           WHERE last_date IN (CURRENT_DATE, CURRENT_DATE - 1)
           ORDER BY last_date DESC
           LIMIT 1), 0
        ) AS current_streak;
      `, [user?.id]),
      databaseConnect.query(`
        SELECT AVG(calories)::NUMERIC(10, 2) AS average_calories
        FROM food_entries
        WHERE user_id = $1;
      `, [user?.id]),
      databaseConnect.query(`
        SELECT 
          food_name,
          COUNT(*) AS times_eaten
        FROM food_entries
        WHERE user_id = $1
        GROUP BY food_name
        ORDER BY times_eaten DESC
        LIMIT 1;
      `, [user?.id])
  ])

  return res.status(200).json({ 
    streak: Number(streak.rows[0].current_streak), 
    averageMeal: Number(averageMeal.rows[0].average_calories) || 0, 
    mostEatenFood: mostEatenFood.rows[0].food_name
  })
}