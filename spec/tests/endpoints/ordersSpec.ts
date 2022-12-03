import supertest from 'supertest'
import { Order } from '../../../src/models/orders'
import app from '../../../src/server'

const request = supertest(app)

describe('Test orders Endpoint responses', () => {
  var token = ''
  beforeAll(async function () {
    const response = await request.post('/user/signIn')
    token = response.body.token
  })

  it('Successful  GET[/products/orders]', async () => {
    const response = await request
      .get('/products/orders')
      .set('Authorization', `Bearar ${token}`)
    expect(response.status).toBe(200)
  })

  it('Successful GET[/products/:orderId]', async () => {
    const response = await request
      .get('/products/1')
      .set('Authorization', `Bearar ${token}`)
    expect(response.status).toBe(200)
  })

  it('Successful create order  POST[/orders/addProduct]', async () => {
    const response = await request
      .post('/orders/addProduct')
      .send({
        orderId: 2,
        productId: 18,
        productName: 'Test Book',
      })
      .set('Authorization', `Bearer ${token}`)
    expect(response.status).toBe(200)
  })
})
