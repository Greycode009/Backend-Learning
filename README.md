# Backend Learning Summary

## Day 1 - Authentication

- Set up a basic Express/MongoDB authentication flow
- Implemented user registration and login
- Stored hashed passwords in MongoDB
- Added JWT access token generation
- Built auth routes and controller logic

## Day 2 - Authentication

- Added refresh token handling and session storage
- Implemented secure HTTP-only refresh cookies
- Added `getMe`, `refreshToken`, `logout`, and `logoutAll` routes
- Created session persistence with refresh token hashing
- Improved auth flow with token rotation and revocation support

## Day 3 - Complete Authentication

- Added email verification with OTP generation and verification
- Implemented email delivery using Nodemailer and Gmail OAuth2
- Added OTP storage, expiration, and validation in MongoDB
- Enforced email verification before login
- Added rollback on failed email send and improved error handling
- Continued managing access/refresh tokens and session logout

## Day 4 - Authorization

- Implemented JWT authentication middleware (`VerifyJWT`) to protect private routes
- Built Role-Based Access Control (RBAC) using user roles and authorization middleware
- Added role information to JWT access tokens for permission-based route protection
- Implemented session validation to revoke access after logout or session expiration
- Secured protected routes with authentication and authorization middleware chaining
- Learned the concept of Ownership-Based Authorization for resource-level access control

## Day 5 – Blog API

- Started building a **Blog API** with Node.js & MongoDB
- Integrated **Authentication & Authorization**
- Implemented **Protected & Role-Based Routes**
- Built **Create & Read Blog APIs**
- Connected blogs with **authenticated users & ownership**

## Day 6 - Blog API & CRUD

- Built Complete Blog CRUD APIs
- Implemented Ownership-Based Access Control
- Connected Blogs with User Accounts
- Tested All CRUD Operations with Postman
- Verified Authorization, Error Handling & Edge Cases

## Day 7 - Comment API

- Built a complete **Comment CRUD API**
- Connected Comments with **Users & Blogs**
- Implemented **Comment Ownership Authorization**
- Added **Blog Existence Validation**
- Tested Comment CRUD, Authorization & **Edge Cases**

## Day 8 - Request Validation

- Added Zod for request validation
- Created reusable validation middleware
- Added Blog & Comment validation schemas
- Validated Create & Update API requests
- Tested valid, invalid, and edge-case inputs

## Day 9 - Centralized Error Handling

- Learned **Centralized Error Handling** in Express
- Created a reusable **`AppError`** class with status codes
- Implemented **Global Error Handling Middleware**
- Learned to handle **404, 403, 400 (CastError), and 500 errors**
- Integrated **Zod validation errors** with the centralized error system

## Day 10 - Pagination

- Learned **API Pagination** with `page` and `limit`
- Implemented MongoDB **`skip()` & `limit()`**
- Added **pagination metadata** with total pages
- Added **Zod validation** for query parameters
- Implemented reusable validation for **body & query** data

## Day 11 - Search, Filtering & Sorting

- Implemented **Blog Search** using title & content
- Added **Author Filtering**
- Added **Latest & Oldest Sorting**
- Combined **Search, Filter & Sort with Pagination**
- Tested **Individual & Combined Queries**

## Day 12 - Practice & Revisit

- Revisited **Search, Filtering, Sorting & Pagination**
- Practiced **Combined Query Parameters**
- Tested **Complex API Queries**
- Debugged **Pagination Logic**
- Reviewed **Request → Controller → Service → Database** flow