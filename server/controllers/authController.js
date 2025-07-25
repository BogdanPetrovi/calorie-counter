import db from '../db/databaseConnect.js'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'

const createToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: "2h" })
}

export const registerUser = async (req, res) => {
  const { name, email, password } = req.body;

  if(!name || !email || !password)
    return res.status(400).json({"message": "All fields are required"})

  if(password.length < 8)
    return res.status(400).json({"message": "Please enter a password with at least 8 characters"})

  try {
    const hashedPassword = await bcrypt.hash(password, 10)
    const result = await db.query('INSERT INTO users(name, email, password) VALUES ($1, $2, $3) RETURNING id, name, email;', [name, email, hashedPassword]);
    const user = result.rows[0];

    return res.status(201).json({"message": "Success", "data": {
      id: user.id,
      name: user.name,
      email: user.email,
      token: createToken(user.id)
    }})

  } catch (err) {
    if(err.code === '23505'){
      if(err.constraint === 'users_email_key'){
         return res.status(409).json({"message": "Email already exists"})
      }
    }

    console.log(err)
    return res.status(500).json({"message": "Registration failed. Please try again later"}) 
  }
}

export const loginUser = async (req, res) => {  
  const { email, password } = req.body;

  if(!email || !password)
    return res.status(400).json({"message": "All fields are required"})

  try {
    const result = await db.query('SELECT * FROM users WHERE email = $1;', [email])
    const user = result.rows[0]

    if(!user || !( await bcrypt.compare(password, user.password) ))
      return res.status(401).json({"message": "Invalid credentials"})
   
    return res.status(200).json({"message": "Success", data: {
      id: user.id,
      name: user.name,
      email: user.email,
      token: createToken(user.id)
    }})

  } catch (err) {
    console.log(err)
    return res.status(500).json({"message": "Logging in failed. Please try again later"})
  }
}

export const getUserInfo = async (req, res) => {
  const user = await db.query('SELECT id, name, email FROM users WHERE id = $1;', [req.user.id])

  if(!user)
    return res.status(400).json({ "message": "User not found" })

  try {
    return res.status(200).json(user.rows[0])  
  } catch (err) {
    return res.status(500).json({"message": "Failed, please try again later"})
  }
}