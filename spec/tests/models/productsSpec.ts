import { Product } from './../../../src/models/product'
import { ProductStore } from '.././../../src/models/product'
const store = new ProductStore()

describe('Product Model', () => {
  it('should have an index method', () => {
    expect(store.index).toBeDefined()
  })

  it('should have a show method', () => {
    expect(store.show).toBeDefined()
  })

  it('should have a create method', () => {
    expect(store.create).toBeDefined()
  })

  it('create method should add a product', async () => {
    const product: Product = {
      productName: 'Test',
      price: 20,
      category: 'test',
    }
    const result = await store.create(product)
    expect(result).toBeTruthy()
  })

  it('index method should return a list of products', async () => {
    const result = await store.index()
    expect(result).toBeTruthy()
  })

  it('show method should return the correct product', async () => {
    const result = await store.show(1)
    expect(result).toBeTruthy()
  })
})
