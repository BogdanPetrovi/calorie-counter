import jwt from "jsonwebtoken";
import db from '../db/databaseConnect.js'

export const isLoggedIn = async (req, res, next) => { 
  const token = req.cookies.token;

  if(!token)
    return res.status(401).json({"message": "Not authorized"})

  try {
    const decode = jwt.decode(token, process.env.JWT_SECRET)
    const result = await db.query('SELECT id, name, email FROM users WHERE id = $1;', [decode.id])

    req.user = result.rows[0]
    next()
  } catch (err) {
    console.log(err)
    return res.status(400).json({ "message": "Error" })
  }
}