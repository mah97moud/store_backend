import supertest from 'supertest'
import { User } from '../../../src/models/user'
import app from '../../../src/server'

const request = supertest(app)

describe('Test user Endpoint responses', () => {
  var token = ''
  beforeAll(async function () {
    const response = await request.post('/user/signIn')
    token = response.body.token
  })

  it('Successful get all users GET[/users]', async () => {
    const response = await request
      .get('/users')
      .set('Authorization', `Bearar ${token}`)
    expect(response.status).toBe(200)
  })

  it('Successful show user with specific id GET[/user/:id]', async () => {
    const response = await request
      .get('/user/1')
      .set('Authorization', `Bearar ${token}`)
    expect(response.status).toBe(200)
  })

  it('Successful create user POST[/user/addNewUser]', async () => {
    const user: User = {
      firstName: 'Mahmoud',
      lastName: 'Atef',
      password: '123456',
      email: 'Mahmoud@email.com',
    }

    const response = await request
      .post('/user/addNewUser')
      .send(user)
      .set('Authorization', `Bearar ${token}`)
    expect(response.status).toBe(200)
  })
})
