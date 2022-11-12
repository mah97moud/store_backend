CREATE TABLE products(
    id SERIAL PRIMARY KEY,
    productName VARCHAR(50) NOT NULL,
    price DOUBLE PRECISION,
    category VARCHAR(30)
);