# Day 18 - URL Shortener Production Features

## GitHub Repository

[View the URL Shortener Project](https://github.com/Greycode009/URL-Shortner.git)

## Today's Progress

- Added **URL Expiration** with `expiresAt`
- Implemented **Expired URL Handling** with `410 Gone`
- Added **Rate Limiting** using `express-rate-limit`
- Added **Custom Short Code** support with validation and duplicate protection
- Tested **Production Edge Cases** including invalid URLs, expired URLs, duplicate codes, 404s, and rate limits

## What I Learned

Today I focused on making the URL Shortener more production-ready instead of only focusing on the basic functionality.

I learned how to implement **time-based business rules** using URL expiration and how to protect an API from excessive requests using **rate limiting**.

I also completed an independent feature by adding **custom short codes**, including validation and duplicate-code handling.

The most important part of today's work was applying previously learned concepts independently and understanding the reasoning behind each feature.

## Testing

Tested:

- Invalid URLs
- Expired URLs
- Future expiration dates
- URLs without expiration
- Duplicate custom codes
- Invalid short codes
- Rate limiting
- Normal URL creation and redirection

## Status

**Day 18 Completed ✅**

**Status: ✅ Completed**

- Designed the URL Shortener architecture
- Built short URL creation
- Implemented unique and custom short codes
- Added URL validation and collision handling
- Implemented short URL redirects
- Added click tracking and statistics
- Added URL expiration
- Added rate limiting
- Tested edge cases and production scenarios
- Completed an independent feature challenge

---

### Project

**URL Shortener**

[GitHub Repository](https://github.com/Greycode009/URL-Shortner.git)
