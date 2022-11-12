CREATE TABLE orders(
    id SERIAL PRIMARY KEY,
    productId integer references products(id),
    quantity integer NOT NULL,
    userId integer references users(id),
    status VARCHAR(15) NOT NULL
);