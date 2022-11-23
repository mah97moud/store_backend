import { client } from '../database'

export type OrderProduct = {
  id?: number
  productId: number
  orderId: number
  productName: string
}

export class OrderProductStore {
  async index(): Promise<OrderProduct[]> {
    try {
      const conn = await client.connect()
      const sql = 'SELECT * FROM orders_products'

      const result = await conn.query(sql)

      conn.release()
      return result.rows
    } catch (err) {
      throw new Error(`Could not get orders_products ${err}`)
    }
  }

  async show(orderId: number): Promise<OrderProduct[]> {
    try {
      const conn = await client.connect()
      const sql = 'SELECT * FROM orders_products WHERE id=($1)'

      const result = await conn.query(sql, [orderId])
      const product = result.rows

      conn.release()
      return product
    } catch (err) {
      throw new Error(
        `Could not find orders_products with id = ${orderId} ${err}`
      )
    }
  }

  async addProductInOrder(
    orderId: number,
    productId: number,
    productName: string
  ): Promise<OrderProduct> {
    try {
      const sql =
        'INSERT INTO orders_products(orderId,productsId,productName) VALUES($1,$2,$3) RETURNING *'

      const conn = await client.connect()
      const result = await conn.query(sql, [orderId, productId, productName])

      const order = result.rows[0]
      conn.release()
      return order
    } catch (err) {
      throw new Error(`Could not add product with id = ${productId} ${err}`)
    }
  }
}
