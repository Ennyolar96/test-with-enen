<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Auth API with NestJS, Prisma, and MySQL</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            line-height: 1.6;
            max-width: 800px;
            margin: 0 auto;
            padding: 20px;
            color: #333;
        }
        h1, h2, h3 {
            color: #2d3436;
        }
        code {
            background-color: #f5f5f5;
            padding: 2px 4px;
            border-radius: 3px;
            font-family: monospace;
        }
        pre {
            background-color: #f5f5f5;
            padding: 10px;
            border-radius: 5px;
            overflow-x: auto;
        }
        .center {
            text-align: center;
        }
        .logo {
            max-width: 200px;
        }
        table {
            width: 100%;
            border-collapse: collapse;
            margin: 20px 0;
        }
        th, td {
            border: 1px solid #ddd;
            padding: 8px;
            text-align: left;
        }
        th {
            background-color: #f2f2f2;
        }
        .feature {
            margin-bottom: 15px;
            padding-left: 20px;
            position: relative;
        }
        .feature:before {
            content: "✅";
            position: absolute;
            left: 0;
        }
    </style>
</head>
<body>
    <div class="center">
        <a href="http://nestjs.com/" target="_blank">
            <img src="https://nestjs.com/img/logo-small.svg" width="200" alt="Nest Logo" class="logo">
        </a>
        <h1>Auth API with NestJS, Prisma, and MySQL</h1>
    </div>

    <h2>Description</h2>
    <p>A secure authentication API built with NestJS featuring:</p>
    <ul>
        <li>User registration with email verification (OTP)</li>
        <li>Login functionality</li>
        <li>Password reset flow</li>
        <li>Change password functionality</li>
        <li>Swagger API documentation</li>
    </ul>

    <h2>Features</h2>
    <div class="feature">User registration with email verification</div>
    <div class="feature">Login with email and password</div>
    <div class="feature">Email verification via OTP (expires in 10 minutes)</div>
    <div class="feature">Swagger documentation for all endpoints</div>
    <div class="feature">Prisma ORM with MySQL database</div>
    <div class="feature">JWT authentication</div>
    <div class="feature">Environment variables configuration</div>

    <h2>Installation</h2>
    <pre><code>$ npm install</code></pre>

    <h2>Setting Up Environment Variables</h2>
    <p>Create a <code>.env</code> file in the root directory with the following variables:</p>
    <pre>

DATABASE_URL="mysql://USER:PASSWORD@HOST:PORT/DATABASE_NAME"
JWT_SECRET=your_jwt_secret_key
ENCRYPTION=your_encryption_password
MAIL_HOST=your_email_service_provider # e.g., 'gmail'
MAIL_USER=your_email@example.com
MAIL_PORT=
MAIL_PASSWORD=your_email_password
OTP_EXPIRATION_MINUTES=10</pre>

    <h2>Database Setup</h2>
    <ol>
        <li>Make sure MySQL is running</li>
        <li>Run Prisma migrations:</li>
    </ol>
    <pre><code>$ npx prisma migrate dev --name init</code></pre>

    <h2>Running the App</h2>
    <pre><code># development

$ npm run start

# watch mode

$ npm run start:dev

# production mode

$ npm run start:prod</code></pre>

    <h2>API Documentation</h2>
    <p>After starting the application, access the Swagger UI at:</p>
    <pre><code>http://localhost:8000/docs</code></pre>

    <h2>API Endpoints</h2>
    <h3>Authentication</h3>
    <table>
        <tr>
            <th>Method</th>
            <th>Endpoint</th>
            <th>Description</th>
        </tr>
        <tr>
            <td>POST</td>
            <td>/auth/signup</td>
            <td>Register a new user</td>
        </tr>
        <tr>
            <td>POST</td>
            <td>/auth/signin</td>
            <td>Login with email and password</td>
        </tr>
        <tr>
            <td>POST</td>
            <td>/auth/verify/:token</td>
            <td>Verify email with OTP</td>
        </tr>
    </table>

    <h2>Database Schema</h2>
    <p>The Prisma schema includes the following models:</p>
    <pre>

model User {
id Int @id @default(cuid())
fullName String
email String @unique
password String
verified Boolean @default(false)
code String?
expiryAt DateTime?
createdAt DateTime @default(now())
updatedAt DateTime @updatedAt
}</pre>

    <h2>Testing</h2>
    <p>To run the unit tests:</p>
    <pre><code>$ npm run test</code></pre>
    <p>For e2e tests:</p>
    <pre><code>$ npm run test:e2e</code></pre>

    <h2>Deployment</h2>
    <p>For production deployment, consider:</p>
    <ol>
        <li>Setting up a production MySQL database</li>
        <li>Using environment-specific configuration</li>
        <li>Implementing proper SSL/TLS</li>
        <li>Setting up monitoring and logging</li>
    </ol>

    <h2>License</h2>
    <p>This project is <a href="LICENSE">MIT licensed</a>.</p>

</body>
</html>
# test-with-enen
