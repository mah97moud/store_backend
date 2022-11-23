import { OrderProduct, OrderProductStore } from './../models/orders_products'
import { Product, ProductStore } from './../models/product'
import dotenv from 'dotenv'
import express, { Request, Response } from 'express'

import verifyAuthToken from '../middleware/verify_auth_token'

dotenv.config()
const store = new OrderProductStore()

const orders = async (req: Request, res: Response) => {
  try {
    const products = await store.index()
    res.json({
      products: products,
    })
  } catch (err) {
    res.status(401)
    res.json({
      error: `${err}`,
    })
  }
}

const show = async (req: Request, res: Response) => {
  const orderId: number = parseInt(req.params.orderId)
  try {
    const p = await store.show(orderId)

    res.json({
      order: p,
    })
  } catch (err) {
    res.status(401)
    res.json({
      error: `${err}`,
    })
  }
}
const addProductInOrder = async (req: Request, res: Response) => {
  const orderId: number = req.body.orderId
  const productId: number = req.body.productId
  const productName: string = req.body.productName
  try {
    const p = await store.addProductInOrder(orderId, productId, productName)

    res.json({
      product: p,
    })
  } catch (err) {
    res.status(401)
    res.json({
      error: `${err}`,
    })
  }
}

const ordersProduct = (app: express.Application) => {
  app.get('/products/orders', verifyAuthToken, orders)
  app.get('/products/:orderId', verifyAuthToken, show)
  app.post('/order/addProduct', verifyAuthToken, addProductInOrder)
}

export default ordersProduct
