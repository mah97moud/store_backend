import supertest from 'supertest'
import app from '../../../src/server'

const request = supertest(app)

describe('Test order products Endpoint responses', () => {
  var token = ''
  beforeAll(async function () {
    const response = await request.post('/user/signIn')
    token = response.body.token
  })

  it('Successful GET[/products/orders]', async () => {
    const response = await request
      .get('/products/orders')
      .set('Authorization', `Bearar ${token}`)
    expect(response.status).toBe(200)
  })

  it('Successful Get order GET[/products/:orderId]', async () => {
    const response = await request
      .get('/products/1')
      .set('Authorization', `Bearar ${token}`)
    expect(response.status).toBe(200)
  })
})
