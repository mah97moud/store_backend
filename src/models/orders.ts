import { client } from '../database'

export type Order = {
  id?: number
  productId: number
  quantity: number
  userId: number
  status: string
}

export class OrderStore {
  async index(): Promise<Order[]> {
    try {
      const conn = await client.connect()
      const sql = 'SELECT * FROM orders'

      const result = await conn.query(sql)

      conn.release()
      return result.rows
    } catch (err) {
      throw new Error(`Could not get orders ${err}`)
    }
  }

  async show(userId: number): Promise<Order> {
    try {
      const conn = await client.connect()
      const sql = 'SELECT * FROM orders WHERE userId=($1)'

      const result = await conn.query(sql, [userId])
      const order = result.rows[0]

      conn.release()
      return order
    } catch (err) {
      throw new Error(`Could not find order with userId = ${userId} ${err}`)
    }
  }
  async create(o: Order): Promise<Order> {
    try {
      const conn = await client.connect()
      const sql =
        'INSERT INTO orders(productId,quantity,userId,status) VALUES($1,$2,$3,$4) RETURNING *'

      const result = await conn.query(sql, [
        o.productId,
        o.quantity,
        o.userId,
        o.status,
      ])
      const order = result.rows[0]

      conn.release()
      return order
    } catch (err) {
      throw new Error(`Could not add order = ${o} ${err}`)
    }
  }
}
