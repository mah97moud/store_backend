import bcrypt from 'bcrypt'
import dotenv from 'dotenv'
import { Request, Response } from 'express'
import { client } from '../database'

dotenv.config()

export type User = {
  id?: number
  firstName: string
  lastName: string
  password: string
  email: string
}

const saltRounds: string = process.env.SALET_ROUNDS as string
const pepper: string = process.env.BCRYPT_PASSWORD as string

export class UserStore {
  async index(): Promise<User[]> {
    console.log(client)
    try {
      const conn = await client.connect()
      const sql = 'SELECT * FROM users'

      const result = await conn.query(sql)

      conn.release()

      return result.rows
    } catch (err) {
      throw new Error(`unable to get users : ${err})`)
    }
  }

  async create(u: User): Promise<User> {
    try {
      const conn = await client.connect()
      const sql =
        'INSERT INTO users(firstName,lastName,userPassword,email) VALUES($1,$2,$3,$4) RETURNING *'

      const hash = bcrypt.hashSync(u.password + pepper, parseInt(saltRounds))
      const result = await conn.query(sql, [
        u.firstName,
        u.lastName,
        hash,
        u.email,
      ])

      const user: User = result.rows[0]
      conn.release()

      return user
    } catch (err) {
      throw new Error(
        `unable create user(${u.firstName + u.lastName} : ${err})`
      )
    }
  }

  async show(id: number): Promise<User> {
    try {
      const conn = await client.connect()
      const sql = 'SELECT * FROM users WHERE id=($1)'

      const result = await conn.query(sql, [id])

      const user: User = result.rows[0]
      conn.release()

      return user
    } catch (err) {
      throw new Error(`unable to Find user With id = ($id) : ${err})`)
    }
  }

  async destroy(id: number): Promise<boolean> {
    try {
      const conn = await client.connect()
      const sql = 'DELETE FROM users WHERE id=($1)'

      const result = await conn.query(sql, [id])

      conn.release()
      if (result.rows.length == 0) {
        return true
      }

      return false
    } catch (err) {
      throw new Error(`unable to delete user With id = ($id) : ${err})`)
    }
  }

  async authenticate(email: string, password: string): Promise<User | null> {
    try {
      const conn = await client.connect()
      const sql = 'SELECT userPassword from users WHERE email=($1)'
      const result = await conn.query(sql, [email])

      if (result.rows.length) {
        const user = result.rows[0]

        if (bcrypt.compareSync(password + pepper, user.userpassword)) {
          return user
        }
      }

      return null
    } catch (err) {
      throw new Error(`unauthenticate user ${err}`)
    }
  }
}
