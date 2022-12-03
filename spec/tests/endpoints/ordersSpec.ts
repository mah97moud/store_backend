import supertest from 'supertest'
import app from '../../../src/server'

const request = supertest(app)

describe('Test orders Endpoint responses', () => {
  var token = ''
  beforeAll(async function () {
    const response = await request.post('/user/signIn')
    token = response.body.token
  })

  it('Successful GET[/orders]', async () => {
    const response = await request
      .get('/orders')
      .set('Authorization', `Bearar ${token}`)
    expect(response.status).toBe(200)
  })
})
