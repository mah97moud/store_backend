import dotenv from 'dotenv'
import express, { Request, Response } from 'express'

import jwt from 'jsonwebtoken'
import verifyAuthToken from '../middleware/verify_auth_token'
import { User, UserStore } from '../models/user'

dotenv.config()
const store = new UserStore()

const { TOKEN_SECRET } = process.env

const users = async (req: Request, res: Response) => {
  try {
    const users = await store.index()
    res.json({
      users: users,
    })
  } catch (err) {
    res.status(401)
    res.json({
      error: `${err}`,
    })
  }
}

const create = async (req: Request, res: Response) => {
  const user: User = {
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    password: req.body.userPassword,
    email: req.body.email,
  }
  console.log(user)

  try {
    const newUser = await store.create(user)
    const token = jwt.sign({ user: newUser }, TOKEN_SECRET as string)

    res.json({
      username: user.firstName + user.lastName,
      email: user.email,
      token: token,
    })
  } catch (err) {
    res.status(400)
    res.json(`${err} ${user}`)
  }
}

const authenticate = async (req: Request, res: Response) => {
  const user = {
    email: req.body.email,
    password: req.body.userPassword,
  }

  try {
    const u = await store.authenticate(user.email, user.password)

    const token = jwt.sign({ user: u }, TOKEN_SECRET as string)
    res.json({
      email: user.email,
      token: token,
    })
  } catch (err) {
    res.status(401)
    res.json({
      error: `${err}`,
    })
  }
}
const show = async (req: Request, res: Response) => {
  const id: number = parseInt(req.params.id)
  try {
    const u = await store.show(id)

    res.json({
      user: u,
    })
  } catch (err) {
    res.status(401)
    res.json({
      error: `${err}`,
    })
  }
}
const destroy = async (req: Request, res: Response) => {
  const id: number = parseInt(req.params.id)
  try {
    const result = await store.destroy(id)

    res.json({
      result: result,
      message: 'User Delete Successfuly',
    })
  } catch (err) {
    res.status(401)
    res.json({
      error: `${err}`,
    })
  }
}

const usersRoutes = (app: express.Application) => {
  app.get('/users', verifyAuthToken, users)
  app.get('/user/:id', verifyAuthToken, show)
  app.delete('/user/:id', verifyAuthToken, destroy)
  app.post('/user/addNewUser', create)
  app.post('/user/signIn', authenticate)
}

export default usersRoutes
