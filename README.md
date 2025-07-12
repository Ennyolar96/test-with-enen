    <div class="center">
        <a href="http://nestjs.com/" target="_blank">
            <img src="https://nestjs.com/img/logo-small.svg" width="200" alt="Nest Logo" class="logo">
        </a>
        <h1>Auth API with NestJS, Prisma, and MySQL</h1>
    </div>

## Description

    <p>A secure authentication API built with NestJS featuring:</p>
    <ul>
        <li>User registration with email verification (OTP)</li>
        <li>Login functionality</li>
        <li>Password reset flow</li>
        <li>Change password functionality</li>
        <li>Swagger API documentation</li>
    </ul>

## Features

    User registration with email verification
    Login with email and password
    Email verification via OTP (expires in 10 minutes)
    Swagger documentation for all endpoints
    Prisma ORM with MySQL database
    JWT authentication
    Environment variables configuration

## Installation

    ```bash
    $ npm install
    ```

## Setting Up Environment Variables

    Create a <code>.env</code> file in the root directory with the following variables:

    DATABASE_URL="mysql://USER:PASSWORD@HOST:PORT/DATABASE_NAME"
    JWT_SECRET=your_jwt_secret_key
    ENCRYPTION=your_encryption_password
    MAIL_HOST=your_email_service_provider # e.g., 'gmail'
    MAIL_USER=your_email@example.com
    MAIL_PORT=
    MAIL_PASSWORD=your_email_password
    OTP_EXPIRATION_MINUTES=10

## Database Setup

    Make sure MySQL is running
    Run Prisma migrations:

```bash
  $ npx prisma migrate dev --name init
```

## Running the App

```bash
  # development
$ npm run start

# watch mode

$ npm run start:dev

# production mode

$ npm run start:prod
```

## API Documentation

    <p>After starting the application, access the Swagger UI at:</p>

```bash
  http://localhost:8000/docs

```

## API Endpoints

# Authentication

Method Endpoint Description
POST /auth/signup Register a new user
POST /auth/signin Login with email and password
GET /auth/verify/:token Verify email with OTP

## Testing

```bash
  # To run the unit tests:
  $ npm run test

  #For e2e tests:
  $ npm run test:e2e
```

## License

This project is [MIT licensed](LICENSE).
