import { Product } from './../../../src/models/product'
import supertest from 'supertest'
import app from '../../../src/server'

const request = supertest(app)

describe('Test products Endpoint responses', () => {
  var token = ''
  beforeAll(async function () {
    const response = await request.post('/user/signIn')
    token = response.body.token
  })

  it('Successful GET[/products]', async () => {
    const response = await request
      .get('/products')
      .set('Authorization', `Bearar ${token}`)
    // productId = response.body.id
    expect(response.status).toBe(200)
  })

  it('Successful Show Product GET[/product/:id]', async () => {
    const response = await request
      .get('/product/1')
      .set('Authorization', `Bearar ${token}`)
    expect(response.status).toBe(200)
  })

  it('Successful create Product GET[/product/create]', async () => {
    const product: Product = {
      productName: 'Test',
      price: 20,
      category: 'test',
    }

    const response = await request
      .post('/product/create')
      .send(product)
      .set('Authorization', `Bearar ${token}`)
    expect(response.status).toBe(200)
  })
})
