# Node User Authentication Starter Kit

This repository provides a starter kit for building user authentication and authorization features in a Node.js application. It includes a sample login and registration flow, as well as an example of how to protect routes and manage user roles and permissions.

### Features
- User registration and login
- Hashing and salting of passwords
- JWT-based authentication
- Route protection and user role management
- Example implementation of user roles and permissions

### Getting Started
1. Clone the repository
```shell
git clone https://github.com/sandeepkv93/node-user-auth-starterkit.git
```

2. Install dependencies
```shell
npm install
```

3. Start the server
```shell
npm start
```

4. Test the endpoints using a tool like Postman or Insomnia. The following routes are available:
  - POST /register for user registration
  - POST /login for user login
  - GET /protected for a protected route example

### Customization
1. Update the config.js file with your own JWT secret and database configuration
2. Add more roles and permissions in the config.js file as per your requirements
3. Update the User model in models directory with any additional fields you need
4. Update the auth middleware in middlewares directory as per your requirements
5. Add more routes and update the existing routes as per your requirements

### Built With
- Node.js
- Express.js
- MongoDB (with Mongoose)
- jsonwebtoken
- bcrypt
