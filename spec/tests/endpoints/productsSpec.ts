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
    expect(response.status).toBe(200)
  })
})
