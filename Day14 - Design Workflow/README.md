# Day 14 — URL Shortener

## Overview

Day 14 marks the beginning of **Project 2: URL Shortener**.

Today focused on designing the system before implementation: understanding the requirements, API design, URL data model, and short-code generation strategy.

**Stack:** Node.js, Express, PostgreSQL

---

## What I Learned

* Understood how a URL shortener converts a long URL into a short URL.
* Designed the API requirements for creating and accessing short URLs.
* Designed the initial URL data model.
* Learned how short codes are generated and why the backend should generate them.
* Understood short-code collisions and how to handle them.
* Designed the basic redirect flow from a short code to the original URL.

---

## API Design

### Create Short URL

```http
POST /shorten
```

Request:

```json
{
  "url": "https://example.com/very-long-url"
}
```

The backend generates a short code and stores the URL mapping.

### Redirect

```http
GET /:shortCode
```

Example:

```http
GET /aB72xK
```

The backend finds the original URL associated with `aB72xK` and redirects the user.

---

## Short-Code Strategy

The backend generates a **random 6-character alphanumeric short code**.

Possible characters:

```text
a-z
A-Z
0-9
```

Example:

```text
aB72xK
```

The short code is not provided by the client.

---

## Collision Handling

Because short codes are randomly generated, the same code could theoretically be generated more than once.

The planned flow is:

```text
Generate short code
        ↓
Check database
        ↓
Already exists?
   ↓           ↓
  YES          NO
   ↓            ↓
Generate      Save
again
```

The `shortCode` will also need to be unique in the database.

---

## Initial Data Model

```text
URL
├── id
├── originalUrl
└── shortCode
```

Example:

```text
id: 1
originalUrl: https://example.com/very-long-url
shortCode: aB72xK
```

---

## System Flow

```text
Client
   ↓
Node.js + Express
   ↓
Generate short code
   ↓
Check collision
   ↓
PostgreSQL
   ↓
Return short URL
```

For redirection:

```text
Short URL
   ↓
Node.js + Express
   ↓
Find shortCode
   ↓
PostgreSQL
   ↓
Get originalUrl
   ↓
Redirect
```

---

## Project Structure

```text
url-shortener/
├── src/
│   ├── config/
│   ├── middleware/
│   ├── features/
│   │   └── url/
│   │       ├── url.model.js
│   │       ├── url.route.js
│   │       ├── url.controller.js
│   │       └── url.service.js
│   ├── app.js
│   └── server.js
├── .env
├── .env.example
├── .gitignore
├── package.json
└── README.md
```

---

## Day 14 Outcome

Day 14 was focused on **design and architecture**, not full implementation.

By the end of the day, the URL Shortener's core requirements, API flow, data model, short-code strategy, collision handling, and project structure were defined.

### Next

**Day 15 — Create Short URLs**

* Create the POST endpoint
* Validate the URL
* Generate a unique short code
* Store the URL mapping
