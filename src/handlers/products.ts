import { Product, ProductStore } from './../models/product'
import dotenv from 'dotenv'
import express, { Request, Response } from 'express'

import verifyAuthToken from '../middleware/verify_auth_token'

const store = new ProductStore()

const products = async (req: Request, res: Response) => {
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

const create = async (req: Request, res: Response) => {
  const p: Product = {
    productName: req.body.productName,
    price: parseInt(req.body.price),
    category: req.body.category,
  }

  try {
    const newProduct = await store.create(p)

    res.json({
      product: newProduct,
    })
  } catch (err) {
    res.status(400)
    res.json(`${err} ${p}`)
  }
}

const show = async (req: Request, res: Response) => {
  const id: number = parseInt(req.params.id)
  try {
    const p = await store.show(id)

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

const productRoutes = (app: express.Application) => {
  app.get('/products', products)
  app.get('/product/:id', show)
  app.post('/product/create', verifyAuthToken, create)
}

export default productRoutes
