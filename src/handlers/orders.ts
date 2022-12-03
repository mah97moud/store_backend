import { Order, OrderStore } from './../models/orders'
import dotenv from 'dotenv'
import express, { Request, Response } from 'express'

import verifyAuthToken from '../middleware/verify_auth_token'

const store = new OrderStore()

const orders = async (req: Request, res: Response) => {
  try {
    const orders = await store.index()
    res.json({
      orders: orders,
    })
  } catch (err) {
    res.status(401)
    res.json({
      error: `${err}`,
    })
  }
}

const create = async (req: Request, res: Response) => {
  const o: Order = {
    productId: parseInt(req.body.productId),
    quantity: parseInt(req.body.quantity),
    userId: parseInt(req.body.userId),
    status: req.body.status,
  }

  try {
    const newOrder = await store.create(o)

    res.json({
      order: newOrder,
    })
  } catch (err) {
    res.status(400)
    res.json(`${err} ${o}`)
  }
}

const show = async (req: Request, res: Response) => {
  const userId: number = parseInt(req.params.userId)
  try {
    const o = await store.show(userId)

    res.json({
      order: o,
    })
  } catch (err) {
    res.status(401)
    res.json({
      error: `${err}`,
    })
  }
}

const ordersRoutes = (app: express.Application) => {
  app.get('/orders', verifyAuthToken, orders)
  app.get('/order/:userId', verifyAuthToken, show)
  app.post('/order/addOrder', verifyAuthToken, create)
}

export default ordersRoutes
