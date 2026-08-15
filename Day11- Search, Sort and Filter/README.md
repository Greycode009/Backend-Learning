# Blog API

A production-style blog backend built with Express, MongoDB, and JWT authentication. This project includes user registration, email verification, secure session-based login, blog management, comments, validation, pagination, and search/filter/sort capabilities.

## Get Started

### Prerequisites

- Node.js
- MongoDB instance or connection string
- Gmail OAuth2 credentials for the email verification flow

### Installation

```bash
npm install
```

### Environment Setup

Create a `.env` file in the project root with the required values:

```env
MONGO_URI=your_mongodb_connection_string
PORT=3000
JWT_SECRET=your_jwt_secret
ACCESS_TOKEN_EXPIRATION=15m
REFRESH_TOKEN_EXPIRATION=7d
GOOGLE_CLIENT_ID=your_google_client_id
GOOGLE_CLIENT_SECRET=your_google_client_secret
GOOGLE_REFRESH_TOKEN=your_google_refresh_token
GOOGLE_USER=your_gmail_address
```

### Run the API

```bash
npm run dev
```

The server starts on the configured `PORT` value and connects to MongoDB using `MONGO_URI`.

## Features

- User registration and login with JWT-based access tokens
- Email OTP verification during registration
- Refresh-token session tracking with cookie-based refresh flow
- Role-based access control via `admin` and `user` roles
- Blog creation, listing, retrieval, update, and deletion
- Blog commenting for authenticated users
- Request validation using Zod schemas
- Centralized error handling
- Pagination, search, author filtering, and sort support
- MongoDB persistence with Mongoose

## Tech Stack

| Layer              | Technology                        |
| ------------------ | --------------------------------- |
| Runtime            | Node.js                           |
| Framework          | Express                           |
| Database           | MongoDB + Mongoose                |
| Authentication     | JWT + cookie-based refresh tokens |
| Validation         | Zod                               |
| Email              | Nodemailer with Gmail OAuth2      |
| Logging            | Morgan                            |
| Environment config | dotenv                            |

## Authentication and Authorization

This API uses JWT access tokens and refresh tokens managed through database-backed sessions.

### Auth Routes

- `POST /api/auth/register`
- `POST /api/auth/login`
- `GET /api/auth/get-me`
- `GET /api/auth/refresh-token`
- `GET /api/auth/logout`
- `GET /api/auth/logout-all`
- `POST /api/auth/verify-email`
- `GET /api/auth/profile` (protected route example)
- `GET /api/auth/admin` (protected route requiring `admin` role)

### Authorization

- Access tokens are sent in the `Authorization` header as `Bearer <token>`.
- The middleware checks the token and validates the session in the database.
- Role protection is enforced with `verifyRole("admin")`.
- A user without the required role receives a `403` response.

### Register Flow

On registration:

1. A new user is created.
2. A 6-digit OTP is generated.
3. The OTP is stored securely with expiry.
4. An email is sent using the configured Gmail OAuth2 account.
5. The user must verify the email before login.

### Login Flow

- Validates email and password.
- Rejects unverified users.
- Creates a DB session record.
- Issues an access token and stores a refresh token in an HTTP-only cookie.

## Blog CRUD Functionality

### Blog Routes

- `POST /api/blogs` — create a blog
- `GET /api/blogs` — list blogs with pagination/search/filter/sort
- `GET /api/blogs/:id` — fetch a blog by ID
- `PUT /api/blogs/:id` — update a blog
- `DELETE /api/blogs/:id` — delete a blog

### Blog Model

The `Blog` model includes:

- `title` — required string
- `content` — required string
- `author` — required `ObjectId` referencing `User`
- timestamps (`createdAt`, `updatedAt`)

### Blog Authorization Rules

- Only the author of a blog can update or delete it.
- A blog can only be created by an authenticated user.

## Comment Functionality

Comments are implemented and tied to a blog.

### Comment Routes

- `POST /api/comments/:blogId/comments` — create a comment on a blog
- `GET /api/comments/:blogId/comments` — fetch comments for a blog
- `PUT /api/comments/:commentId` — update a comment
- `DELETE /api/comments/:commentId` — delete a comment

### Comment Rules

- Only authenticated users can create, update, or delete comments.
- Comment authors can update or delete only their own comments.
- A comment references both the `blog` and `author`.

## Request Validation

Validation is handled centrally using Zod schemas.

### Blog Validation

- `createBlogSchema`
  - `title`: string, trimmed, minimum 3 characters
  - `content`: string, trimmed, minimum 10 characters
- `updateBlogSchema`: partial version of the create schema
- `paginationSchema`
  - `search`: optional string
  - `author`: optional string
  - `sort`: `latest` or `oldest`, default `latest`
  - `page`: integer, minimum 1, default 1
  - `limit`: integer between 1 and 100, default 10

### Comment Validation

- `content`: string, trimmed, minimum 3 characters

Requests that fail schema validation return a `400` with validation errors.

## Centralized Error Handling

The app uses a global error middleware registered in `src/app.js`.

Behavior includes:

- `CastError` becomes a `400` with `"Invalid ID format."`
- Other errors return `success: false` plus `message`
- Validation errors are attached under `errors` when available

The error middleware is defined in `src/middleware/error.middleware.js` and the app-level custom error class is in `src/utils/AppError.js`.

## Pagination, Search, Filtering, and Sorting

The blog listing endpoint supports all of the following:

### Query Parameters

| Parameter | Type                 | Description                                                  | Default  |
| --------- | -------------------- | ------------------------------------------------------------ | -------- |
| `search`  | string               | Searches blog title and content using case-insensitive regex | none     |
| `author`  | string               | Filters blogs by author ID                                   | none     |
| `sort`    | `latest` or `oldest` | Sorts by `createdAt`                                         | `latest` |
| `page`    | number               | Page index                                                   | `1`      |
| `limit`   | number               | Number of items per page                                     | `10`     |

### Behavior

- `search` checks both `title` and `content`
- `author` filters by the `author` field
- `sort` uses `createdAt` ascending for `oldest` and descending for `latest`
- Response includes pagination metadata with `page`, `limit`, `total`, and `totalPages`

## API Usage Examples

### Register a user

```http
POST /api/auth/register
Content-Type: application/json

{
  "username": "johndoe",
  "email": "johndoe@example.com",
  "password": "password123"
}
```

Example response:

```json
{
  "message": "User registered successfully",
  "user": {
    "username": "johndoe",
    "email": "johndoe@example.com",
    "verified": false
  }
}
```

### Verify email

```http
POST /api/auth/verify-email
Content-Type: application/json

{
  "email": "johndoe@example.com",
  "otp": "123456"
}
```

### Login

```http
POST /api/auth/login
Content-Type: application/json

{
  "email": "johndoe@example.com",
  "password": "password123"
}
```

Example response:

```json
{
  "message": "Login successful",
  "user": {
    "username": "johndoe",
    "email": "johndoe@example.com"
  },
  "accessToken": "<jwt-token>"
}
```

### Get current user

```http
GET /api/auth/get-me
Authorization: Bearer <accessToken>
```

### Refresh token

```http
GET /api/auth/refresh-token
```

The refresh token is expected in the cookie named `refreshToken`.

### Create a blog

```http
POST /api/blogs
Authorization: Bearer <accessToken>
Content-Type: application/json

{
  "title": "My First Blog",
  "content": "This is the blog content that will be stored in the database."
}
```

### List blogs with search, filter, sort, and pagination

```http
GET /api/blogs?search=first&author=<userId>&sort=latest&page=1&limit=10
```

Example response:

```json
{
  "success": true,
  "message": "Blogs fetched successfully.",
  "data": {
    "blogs": [
      {
        "_id": "...",
        "title": "My First Blog",
        "content": "This is the blog content ...",
        "author": "...",
        "createdAt": "...",
        "updatedAt": "..."
      }
    ],
    "pagination": {
      "page": 1,
      "limit": 10,
      "total": 1,
      "totalPages": 1
    }
  }
}
```

### Get blog by ID

```http
GET /api/blogs/:id
```

### Update a blog

```http
PUT /api/blogs/:id
Authorization: Bearer <accessToken>
Content-Type: application/json

{
  "title": "Updated blog title",
  "content": "Updated blog content"
}
```

### Delete a blog

```http
DELETE /api/blogs/:id
Authorization: Bearer <accessToken>
```

### Create a comment

```http
POST /api/comments/:blogId/comments
Authorization: Bearer <accessToken>
Content-Type: application/json

{
  "content": "Nice article!"
}
```

### Get comments for a blog

```http
GET /api/comments/:blogId/comments
```

### Update a comment

```http
PUT /api/comments/:commentId
Authorization: Bearer <accessToken>
Content-Type: application/json

{
  "content": "Updated comment text"
}
```

### Delete a comment

```http
DELETE /api/comments/:commentId
Authorization: Bearer <accessToken>
```

## Project Structure

```text
Day11- Search, Sort and Filter/
├── .env
├── package.json
├── server.js
├── Readme.md
└── src/
    ├── app.js
    ├── config/
    │   ├── config.js
    │   └── database.js
    ├── features/
    │   ├── auth/
    │   │   ├── auth.controller.js
    │   │   ├── auth.routes.js
    │   │   ├── email.service.js
    │   │   ├── otp.model.js
    │   │   └── session.model.js
    │   ├── blog/
    │   │   ├── blog.controllers.js
    │   │   ├── blog.model.js
    │   │   ├── blog.routes.js
    │   │   ├── blog.service.js
    │   │   └── blog.validation.js
    │   ├── comment/
    │   │   ├── comment.controllers.js
    │   │   ├── comment.model.js
    │   │   ├── comment.routes.js
    │   │   ├── comment.service.js
    │   │   └── comment.validation.js
    │   └── user/
    │       ├── user.controllers.js
    │       ├── user.model.js
    │       ├── user.routes.js
    │       └── user.service.js
    ├── middleware/
    │   ├── error.middleware.js
    │   ├── validate.js
    │   ├── verifyJWT.js
    │   └── verifyRole.js
    └── utils/
        ├── AppError.js
        └── utils.js
```

## Installation and Setup

1. Clone the repository.
2. Navigate to the project directory.
3. Install dependencies:

```bash
npm install
```

4. Create a `.env` file in the project root using the required values below.
5. Start the server:

```bash
npm run dev
```

## Required Environment Variables

This project expects the following environment variables to be defined:

```env
MONGO_URI=your_mongodb_connection_string
PORT=3000
JWT_SECRET=your_jwt_secret
ACCESS_TOKEN_EXPIRATION=15m
REFRESH_TOKEN_EXPIRATION=7d
GOOGLE_CLIENT_ID=your_google_client_id
GOOGLE_CLIENT_SECRET=your_google_client_secret
GOOGLE_REFRESH_TOKEN=your_google_refresh_token
GOOGLE_USER=your_gmail_address
```

These values are referenced in `src/config/config.js` and are required for database connection, JWT issuance, and email sending.

## How to Run the Project

```bash
npm run dev
```

The server starts on the value of `PORT` in the `.env` file, defaulting to `3000` if not explicitly set.

## Example Response Shape

```json
{
  "success": true,
  "message": "Blog created successfully.",
  "data": {
    "_id": "67a5c9d3e9c1d3a8a3f4d9b2",
    "title": "My First Blog",
    "content": "This is the blog content.",
    "author": "67a5c9d3e9c1d3a8a3f4d9b1",
    "createdAt": "2026-08-15T12:00:00.000Z",
    "updatedAt": "2026-08-15T12:00:00.000Z"
  }
}
```

## Author

Developed by Dipesh Malla.

---

This API demonstrates a complete blog backend flow with authentication, authorization, validation, and modern API patterns for CRUD, comments, and list/search operations.
