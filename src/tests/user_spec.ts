import { User, UserStore } from '../models/user'

const store = new UserStore()
const user: User = {
  firstName: 'Mahmoud',
  lastName: 'Atef',
  email: 'Mahmoud@gmail.com',
  password: '123456',
}

describe('User Model', () => {
  it('should have an index method', () => {
    expect(store.index).toBeDefined()
  })

  it('should have a show method', () => {
    expect(store.show).toBeDefined()
  })

  it('should have a create method', () => {
    expect(store.create).toBeDefined()
  })

  it('should have a delete method', () => {
    expect(store.destroy).toBeDefined()
  })

  it('create method should add a book', async () => {
    const result = await store.create(user)
    expect(result).toEqual(user)
  })

  it('index method should return a list of books', async () => {
    const result = await store.index()
    expect(result).toEqual([user])
  })

  it('show method should return the correct book', async () => {
    const result = await store.show(1)
    expect(result).toEqual(user)
  })

  it('delete method should remove the book', async () => {
    const result = await store.destroy(1)

    expect(result).toEqual(true)
  })
})
