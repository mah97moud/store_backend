import { client } from '../database'

export type Product = {
  id?: number
  productName: string
  price: number
  category: string
}

export class ProductStore {
  async index(): Promise<Product[]> {
    try {
      const conn = await client.connect()
      const sql = 'SELECT * FROM products'

      const result = await conn.query(sql)

      conn.release()
      return result.rows
    } catch (err) {
      throw new Error(`Could not get products ${err}`)
    }
  }

  async show(id: number): Promise<Product> {
    try {
      const conn = await client.connect()
      const sql = 'SELECT * FROM products WHERE id=($1)'

      const result = await conn.query(sql, [id])
      const product = result.rows[0]

      conn.release()
      return product
    } catch (err) {
      throw new Error(`Could not find product with id = ${id} ${err}`)
    }
  }
  async create(p: Product): Promise<Product> {
    try {
      const conn = await client.connect()
      const sql =
        'INSERT INTO products(productName,price,category) VALUES($1,$2,$3) RETURNING *'

      const result = await conn.query(sql, [p.productName, p.price, p.category])
      const product = result.rows[0]

      conn.release()
      return product
    } catch (err) {
      throw new Error(`Could not add product = ${p} ${err}`)
    }
  }
}
