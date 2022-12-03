# for run this project follow steps

# Start Project

npm install

# start server

npm run watch

# Storefront Backend Project

# import info

1- port = 3000
2- env variable
POSTGRES_HOST=127.0.0.1
POSTGRES_DB=store
POSTGRES_TEST_DB=store_test
POSTGRES_USER=postgres
POSTGRES_PASSWORD=123456

ENV=dev
BCRYPT_PASSWORD=my_Secret

SALT_ROUNDS=20
TOKEN_SECRET=MAHMOUD_SECRET

# API Requirements

The company stakeholders want to create an online storefront to showcase their great product ideas. Users need to be able to browse an index of all products, see the specifics of a single product, and add products to an order that they can view in a cart page. You have been tasked with building the API that will support this application, and your coworker is building the frontend.

These are the notes from a meeting with the frontend developer that describe what endpoints the API needs to supply, as well as data shapes the frontend and backend have agreed meet the requirements of the application.

## API Endpoints

#### Products

- Index
  Route for index '/products' [Get] Method
- Show
  Route for show '/product/:id' [Get] Method
- Create [token required]
  Route for create '/product/create' [Post] Method

#### Users

- Index [token required]
  Route for index '/users' [Get] Method
- Show [token required]
  Route for index '/user/:id' [Get] Method
- Create N[token required]
  Route for index '/user/addNewUser' [Post] Method

#### Orders

- Current Order by user (args: user id)[token required]
  Route for index '/order/:userId' [Get] Method

#### Orders Products

- Index [token required]
  Route for index '/products/orders' [Get] Method
- Show [token required]
  Route for index '/products/:orderId' [Get] Method
- Create Order [token required]
  Route for index '/order/addProduct' [Post] Method

## Data Shapes

#### Product

- id
- name
- price
- category

Table: products (id:integer, productName:string, price:Double, category:string)

#### User

- id
- firstName
- lastName
- password

Table: users (id:integer, firstName:string, lastName:string, userPassword:integer, email: string)

#### Orders

- id
- id of each product in the order
- quantity of each product in the order
- user_id
- status of order (active or complete)

Table: orders (id:integer, productId:integer[foreign key to products table], quantity:integer, userId:integer[foreign key to users table], status:string)

#### Orders Products

- id
- productsId of each product in the order
- productName
- orderId of each order

Table: orders_products (id:integer, productId:integer[foreign key to products table], orderId:integer[foreign key to orders table], userId:integer[foreign key to users table], productName:string)
