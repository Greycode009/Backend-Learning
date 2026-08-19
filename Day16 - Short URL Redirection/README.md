# Day 16 - Short URL Redirection

## GitHub Repository

[View the URL Shortener Project](https://github.com/Greycode009/URL-Shortner.git)

## Today's Progress

Today I continued building the **URL Shortener backend** by implementing the redirection flow.

### Completed

- Built the **Short URL Redirect API**
- Added **Short-Code Lookup** using Sequelize
- Added **404 handling** for invalid short codes
- Implemented **Redirect to Original URL**
- Tested the complete **Request → Controller → Database → Redirect** flow

## Flow

```text
GET /:shortCode
      ↓
Extract shortCode
      ↓
Find URL in PostgreSQL
      ↓
URL found?
   ├── No → 404 Not Found
   └── Yes
        ↓
Redirect to originalUrl