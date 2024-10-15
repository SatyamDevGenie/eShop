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

### Employee API's

#### Retrieve all employees

- **Endpoint**: `GET http://localhost:3004/api/employees/`
- **Response**: Returns a JSON array of all employees.

  ```
  {
  "employees": [
      {
      "id": 9,
      "name": "Erina nakiri",
      "employee_code": "EMP008",
      "salary": 400000
      },
      {
      "id": 11,
      "name": "Alice Johnson",
      "employee_code": "EMP003",
      "salary": 80000
      }
  ]
  }

  ```

#### Retrieve an employee by ID

- **Endpoint**: `GET http:/localhost:3004/api/employees/:{add_employee_id}`

  ```
  {
  "employee": {
      "id": 9,
      "name": "Erina nakiri",
      "employee_code": "EMP008",
      "salary": 400000
  }
  }
  ```

- **Response**: Returns a JSON object of the employee with the specified ID.

#### Delete an employee by ID

- **Endpoint**:

  `DELETE http://localhost:3004/api/employees/:{add_employee_id}`

  ```
  {
  "message": "Deleted Successfully"
  }
  ```

- **Response**: Deletes the employee with the specified ID and returns 'deleted successfully' if successful.

#### Add a new employee

- **Endpoint**: `POST http://localhost:3004/api/employees/`
- **Request Body Format**:

  ```json
  {
    "name": "John Doe",
    "employee_code": "EMP001",
    "salary": 50000
  }
  ```

- **Response**: Returns a JSON object with the message 'Employee added successfully' if successful.

#### Update an employee by ID

- **Endpoint**:

  `PUT http://localhost:3004/api/employees/:id`

- **Request Body Format**:

  ```json
  {
    "name": "Updated Name",
    "employee_code": "EMP002",
    "salary": 60000
  }
  ```

- **Response**: Returns a JSON object with the message 'Updated successfully' if successful.

### Below is the database screenshot example:-

![Alt text](image-3.png)

# Employee Management API Tests

The API is designed to manage employee data, providing endpoints for retrieving, adding, updating, and deleting employee records.

## Dependencies

Before running the tests, ensure you have the following dependencies installed:

- [Node.js](https://nodejs.org/)
- [npm](https://www.npmjs.com/)
- [Jest](https://jestjs.io/) (version ^29.7.0)
- [Supertest](https://www.npmjs.com/package/supertest) (version ^6.3.4)
- [mysql2](https://www.npmjs.com/package/mysql2) (version ^3.9.1)

Install the dependencies using the following command:

```bash
npm install
```

## Important Note: Database Connection

_**⚠️ The tests in this suite operate on a real-time MySQL database connection. Before running the tests, it's crucial to ensure that the database is properly set up, and any required values for testing (such as employee IDs) are known. ( Please look at the table and it will be more easy to adjust the employee Id's ), and please look into current written test cases and there ids to get idea how to adjust⚠️**_

## Running Tests

To execute the test suite, use the following command:

```bash
npm test
```

The tests cover various scenarios for the Employee Management API, including:

- Retrieving all employees.
- Retrieving an employee by ID.
- Deleting an employee by ID.
- Adding a new employee.
- Handling conflicts when adding an employee with an existing employee_code.
- Updating an existing employee.

## Sample Test Output

Running the test suite should produce output similar to the following:

![Alt text](image-1.png)

# Important Notice

**Attention: If you have run the test cases before, follow these instructions carefully!**

If you've previously executed the test cases, it's crucial to update the test case IDs according to the `(NOTE)` provided at the bottom of the test file. Failure to do so will result in the following error:

### Instructions for Updating Test Cases

1. Open the test file in your preferred code editor.
2. Locate the `(NOTE)` section at the bottom of the `(employee.tests.js)` file.
3. Update each test case ID according to the provided guidelines.
4. Save the changes.

By ensuring that the test case IDs match the specified format, you'll avoid encountering errors during testing. Thank you for your attention to this matter!

## This how test cases looks if you dont update (id) after each (test run)

![Alt text](image-2.png)

## Troubleshooting Tests

If you encounter issues running the tests, try the following steps:

1. Ensure all dependencies are installed (`npm install`).
2. Check your Node.js and npm versions.
3. Verify the correctness of your environment variables for connecting to the MySQL database.
