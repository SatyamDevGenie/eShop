# RST Store - Ecommerce Application

Welcome to the RST Ecommerce platform, a Node.js and Express application with mongoDB as the database. This backend system allows you to efficiently manage employee data through various API endpoints. Whether you're retrieving employee information like user authentication with admin panel and much more things regarding ecommerce payments.

### Tech Stack

- Node.js
- Express.js
- React.js
- Redux.js
- Javascript


## Installation for Local Environment

1. Clone the repository:

```bash
https://github.com/SatyamDevGenie/eShop.git
```

2. Change to the project directory:

```bash
cd eShop
```

3. Install dependencies:

```bash
npm install in both frontend & backend
```

4. Start the project:

```bash
npm run dev in root folder [ eShop ]
```

5. Add a .env file with the following content to run the server:

```bash
PORT=5000
NODE_ENV=development
MONGO_URI=mongodb+srv://satyam:123@cluster0.mhmfhbx.mongodb.net/RST?retryWrites=true&w=majority
JWT_SECRET=satyam123
```


## API Reference

### Users API's

#### Register a user

- **Endpoint**: `POST http://localhost:5000/api/users/`


#### Login a user

- **Endpoint**: `POST http://localhost:5000/api/users/login`


#### Get user by ID

- **Endpoint**: `GET http://localhost:5000/api/users/:id`

#### Update user profile

- **Endpoint**: `PUT http://localhost:5000/api/users/:id`


### Delete a user

- **Endpoint**: `DELETE http://localhost:5000/api/users/:id`




## Products API's

### Get all products

- **Endpoint**: `GET http://localhost:5000/api/products`

### Get single product by ID

- **Endpoint**: `GET http://localhost:5000/api/products/:id`

### Create Product 

- **Endpoint**: `GET http://localhost:5000/api/products/`

### Update Product 

- **Endpoint**: `PUT http://localhost:5000/api/products/:id`

### Delete Product 

- **Endpoint**: `DELETE http://localhost:5000/api/products/:id`




## Orders API's

### Get order

- **Endpoint**: `GET http://localhost:5000/api/orders/:id`

### Create Order

- **Endpoint**: `POST http://localhost:5000/api/orders/`

### Update order

- **Endpoint**: `PUT http://localhost:5000/api/products/:id/pay`

### Delievered a placed order by a customer

- **Endpoint**: `PUT http://localhost:5000/api/products/:id/deliever`



## Dependencies

Before running the tests, ensure you have the following dependencies installed:

- [Node.js](https://nodejs.org/)
- [Git](https://www.git.com/)
- [mongoDB](https://www.npmjs.com/package/mongodb)


