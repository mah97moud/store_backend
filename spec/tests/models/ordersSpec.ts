import { Order, OrderStore } from '../../../src/models/orders'
import { User, UserStore } from '../../../src/models/user'

const store = new OrderStore()

describe('Order Model', () => {
  it('should have an index method', () => {
    expect(store.index).toBeDefined()
  })

  it('should have a show method', () => {
    expect(store.show).toBeDefined()
  })

  it('should have a create method', () => {
    expect(store.create).toBeDefined()
  })

  it('create method should add a order', async () => {
    const order: Order = {
      productId: 1,
      quantity: 2,
      userId: 1,
      status: 'active',
    }
    const result = await store.create(order)
    expect(result).toBeTruthy()
  })

  it('index method should return a list of orders', async () => {
    const result = await store.index()
    expect(result).toBeTruthy()
  })

  it('show method should return the correct order', async () => {
    const result = await store.show(1)
    expect(result).toBeTruthy()
  })
})
