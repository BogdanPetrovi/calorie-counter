import jwt from "jsonwebtoken";
import db from '../db/databaseConnect.js'

export const isLoggedIn = async (req, res, next) => { 
  const token = req.cookies.token;

  if(!token)
    return res.status(401).json({"message": "Not authorized"})

  try {
    const decode = jwt.decode(token, process.env.JWT_SECRET)
    const result = await db.query('SELECT id, name, email FROM users WHERE id = $1;', [decode.id])

    if(result.rows === undefined || result.rows.length == 0)
      return res.clearCookie('token').status(401).json({"message": "Not authorized"})

    req.user = result.rows[0]
    next()
  } catch (err) {
    return res.status(400).json({ "message": "Error" })
  }
}