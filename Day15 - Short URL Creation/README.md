# Day 15 - Short URL Creation

## GitHub Repository

```https://github.com/Greycode009/URL-Shortner```

## Today's Progress

Today I started building the **URL Shortener backend** from scratch using **Node.js, Express, Sequelize, and PostgreSQL**.

### Completed

- Set up the **PostgreSQL database connection** using Sequelize
- Created the **URL Sequelize model**
- Created the **POST `/api/shorten` endpoint**
- Added **URL validation**
- Implemented **6-character short code generation**
- Stored generated short URLs in **PostgreSQL**
- Added **unique short code collision handling**
- Tested the complete **Request → Controller → Service → Database** flow

## Tech Stack

- Node.js
- Express.js
- Sequelize
- PostgreSQL
- Supabase
- Postman

## Git Progress

```text
Day 15
  ↓
Express API
  ↓
URL Validation
  ↓
Short Code Generation
  ↓
PostgreSQL + Sequelize
  ↓
URL Model
  ↓
Database Persistence
  ↓
Collision Handling