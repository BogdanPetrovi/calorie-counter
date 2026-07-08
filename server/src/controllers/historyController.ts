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

export const mealLogPage = async (req: Request, res: Response) => {
  const user = req.user
  const { page } = req.query

  if(Number(page) < 1) return res.status(400).json({ message: "Page can only be a positive number" })

  const offset = (Number(page) - 1) * 5
  const result = await databaseConnect.query(`
      SELECT * FROM food_entries
      WHERE user_id = $1
      ORDER BY created_at DESC
      LIMIT 5 OFFSET $2;
    `, [user?.id, offset])

  const fixedNamesResult = result.rows.map(row => {
    return {
      id: row.id,
      foodName: row.food_name,
      calories: row.calories,
      mealType: row.meal_type,
      createdAt: row.created_at,
      servingSize: row.serving_size
    }
  })

  const transformedResult = fixedNamesResult.map(row => {
    return {
      ...row,
      createdAt: new Intl.DateTimeFormat('sr-RS', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric',
        hour:'2-digit',
        minute: '2-digit',
        hour12: false
      }).format(row.createdAt)
    }
  })

  return res.status(200).json(transformedResult)
}

export const logPages = async (req: Request, res: Response) => {
  const user = req.user

  const result = await databaseConnect.query("SELECT COUNT(*) AS total FROM food_entries WHERE user_id = $1;", [user?.id])

  return res.status(200).json({
    pages: Math.ceil(Number(result.rows[0].total) / 5) || 1
  })
}

export const avgPerMeal = async (req: Request, res: Response) => {
  const user = req.user

  const result = await databaseConnect.query(`
      SELECT AVG(calories) FILTER (WHERE meal_type = 'breakfast')::NUMERIC(10,2) as breakfast,
        AVG(calories) FILTER (WHERE meal_type = 'lunch')::NUMERIC(10,2) as lunch,
        AVG(calories) FILTER (WHERE meal_type = 'dinner')::NUMERIC(10,2) as dinner,
        AVG(calories) FILTER (WHERE meal_type = 'snack')::NUMERIC(10,2) as snack
      FROM food_entries 
      WHERE user_id=$1
      AND created_at > CURRENT_DATE - 6;
    `, [user?.id])

  return res.status(200).json(result.rows[0])
}