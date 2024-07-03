# Admin Panel Backend

This is the backend server for the Admin Panel application. It provides RESTful API endpoints for user management, including user creation, updating, deletion, and retrieval with pagination support.

## Technologies Used

- Node.js
- Express
- MongoDB
- Mongoose
- JWT (JSON Web Tokens)
- Bcrypt
- Dotenv

## Prerequisites

- Node.js (v18.12.0 or higher)
- MongoDB

## Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/your-username/admin-panel-backend.git
   cd admin-panel-backend
   ```
2. Install the dependencies:

    ```bash
   pnpm install
   ```
   
3. Create a .env file in the root directory and add the following environment variables:
    
    ```bash
   JWT_SECRET=Mayank__001__@
    MONGO_URI=mongodb+srv://api:Dahnkot%401@cluster0.qkslgxa.mongodb.net/myDatabase?retryWrites=true&w=majority
    ```
## Running the Server

- To start the server, run:
    ```bash
        npm start
    ```

- The server will run on http://localhost:5000

## API Endpoints

### Authentication

- POST /api/auth/register - Register a new user
- POST /api/auth/login - Login a user and get a token

### Users

- GET /api/users - Get a list of users (supports pagination with page and limit query parameters)
- POST /api/users - Create a new user
- PUT /api/users/:id - Update an existing user
- DELETE /api/users/:id - Delete a user

## Middleware

- auth - Protects routes that require authentication
- adminAuth - Protects routes that require admin privileges

## Directory Structure

```bash
    admin-panel-backend/
├── config/
│   └── db.js
├── controllers/
│   ├── authController.js
│   └── userController.js
├── middlewares/
│   └── authMiddleware.js
├── models/
│   └── User.js
├── routes/
│   ├── authRoutes.js
│   └── userRoutes.js
├── .env
├── server.js
└── package.json
```


