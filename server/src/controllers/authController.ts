import { Request, Response } from 'express'
import db from '../db/databaseConnect.js'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import AppError from '../utils/appError.js'
import { DatabaseError } from 'pg'

const createToken = (id: number) => {
  return jwt.sign({ id }, process.env.JWT_SECRET!, { expiresIn: "30d" })
}

export const registerUser = async (req: Request, res: Response) => {
  const { fullName, email, password } = req.body

  if(!fullName || !email || !password)
    return res.status(400).json({"message": "All fields are required"})

  if(password.length < 8)
    return res.status(400).json({"message": "Please enter a password with at least 8 characters"})

  try {
    const hashedPassword = await bcrypt.hash(password, 10)
    const result = await db.query('INSERT INTO users(name, email, password) VALUES ($1, $2, $3) RETURNING id, name, email;', [fullName, email, hashedPassword]);
    const user = result.rows[0];

    return res.status(201).
                cookie('token', createToken(user.id), { maxAge: 1000 * 60 * 60 * 24 * 30 }).
                json({"message": "Success", "data": {
                  id: user.id,
                  fullName: user.fullName,
                  email: user.email,
                }})
  } catch (err) {
    if(err instanceof DatabaseError && err.code === '23505')
      throw new AppError("This email is already associated with an existing account. Please try logging in instead.", 409)
    
    throw err
  }
}

export const loginUser = async (req: Request, res: Response) => {  
  const { email, password } = req.body;

  if(!email || !password)
    return res.status(400).json({"message": "All fields are required"})

  const result = await db.query('SELECT * FROM users WHERE email = $1;', [email])
  const user = result.rows[0]

  if(!user || !( await bcrypt.compare(password, user.password) ))
    return res.status(401).json({"message": "Invalid credentials"})
  
  return res.status(200).
              cookie('token', createToken(user.id), { maxAge: 1000 * 60 * 60 * 24 * 30 }).
              json({"message": "Success", "data": {
                id: user.id,
                fullName: user.fullName,
                email: user.email,
                }})
}

export const logOut = async (req: Request, res: Response) => {
  return res.clearCookie('token').status(200).json({"message": "Successfully logged out"})
}

export const getUserInfo = async (req: Request, res: Response) => {
  if(!req.user) return res.sendStatus(401)

  const user = await db.query(`SELECT users.name, users.email, users.created_at, user_profiles.activicy_level, 
                                user_profiles.updated_at, user_profiles.date_of_birth::text, user_profiles.gender,
                                user_profiles.goal, user_profiles.height_cm, user_profiles.target_daily_calories,
                                user_profiles.weight_kg FROM users
                                LEFT JOIN user_profiles ON user_profiles.user_id = users.id
                                WHERE users.id = $1;`,
                              [req.user.id])
  
  if(!user)
    return res.status(401).json({ "message": "Not authorized" })

  return res.status(200).json(user.rows[0])
}

export const changePersonalInfo = async (req: Request, res: Response) => {
  const user = req.user
  const { name, email } = req.body

  if(!name || !email) 
    return res.status(400).json({ message: "Please provide both name and email" })

  const result = await db.query(`
      UPDATE users
      SET name = $1, email = $2
      WHERE id = $3;
    `, [name, email, user?.id])
  
  return res.sendStatus(204)
}