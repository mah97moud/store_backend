CREATE TABLE orders_products (
    id SERIAL PRIMARY KEY,
    productsId integer references products(id),
    orderId integer references orders(id),
    productName VARCHAR(50) 
);