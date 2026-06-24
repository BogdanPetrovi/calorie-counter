import { Request, Response, NextFunction } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";
import db from '../db/databaseConnect.js'

export const isLoggedIn = async (req: Request, res: Response, next: NextFunction) => { 
  const token = req.cookies.token;

  if(!token)
    return res.status(401).json({"message": "Not authorized"})

  try {
    const secret = process.env.JWT_SECRET
    if(!secret) throw new Error("JWT_SECRET is not defined")

    const decode = jwt.verify(token, process.env.JWT_SECRET!) as JwtPayload
    const result = await db.query('SELECT id, name, email FROM users WHERE id = $1;', [decode.id])

    if(result.rows === undefined || result.rows.length == 0)
      return res.clearCookie('token').status(401).json({"message": "Not authorized"})

    req.user = result.rows[0]
    next()
  } catch (err) {
    return res.status(400).json({ "message": "Error" })
  }
}