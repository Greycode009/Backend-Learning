# Day 17 - Click Tracking & Analytics

## GitHub Repository

[View the URL Shortener Project](https://github.com/Greycode009/URL-Shortner.git)

## Today's Progress

Today I continued building the **URL Shortener backend** by adding click tracking and basic analytics.

### Completed

- Added **Click Tracking** for Short URLs
- Added **Click Count** to the URL database model
- Incremented clicks whenever a Short URL is visited
- Built the **URL Statistics Endpoint**
- Added **404 handling** for invalid short codes
- Tested the complete **Redirect → Click Tracking → Statistics** flow

## Flow

```text
GET /api/:shortCode
        ↓
Find Short URL
        ↓
Increment Click Count
        ↓
Save to PostgreSQL
        ↓
Redirect to Original URL