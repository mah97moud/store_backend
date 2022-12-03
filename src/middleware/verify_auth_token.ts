import jwt from 'jsonwebtoken'
import { Request, Response } from 'express'
import dotenv from 'dotenv'

dotenv.config()

const TOKEN_SECRET = process.env.TOKEN_SECRET as string

const verifyAuthToken = (req: Request, res: Response, next: Function) => {
  try {
    const authHeader = req.headers.authorization as string
    const token: string = authHeader?.split(' ')[1] as string

    console.log(token)
    jwt.verify(token, TOKEN_SECRET)
    next()
  } catch (err) {
    res.status(401)
    res.json({
      error: `${err}`,
    })
  }
}

export default verifyAuthToken
