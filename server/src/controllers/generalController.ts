import { Request, Response } from "express"
import databaseConnect from "../db/databaseConnect.js"

export const weightReminder = async (req: Request, res: Response) => {
  const user = req.user

  const result = await databaseConnect.query(
    `SELECT date from weight_updates 
    WHERE user_id = $1 
    ORDER BY date DESC LIMIT 1;`,
    [user?.id]
  )

  const lastUpdate = new Date(result.rows[0].date)
  const now = new Date()
  const fiveDaysAgo = new Date(now.getTime() - 1000 * 60 * 60 * 24 * 5)

  const isInLastFiveDays = lastUpdate >= fiveDaysAgo

  if(isInLastFiveDays)
    return res.status(200).json({ show: false })

  return res.status(200).json({ show: true })
}