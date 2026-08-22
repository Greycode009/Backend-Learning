# Day 19 - File Uploads

## Project Repository

🔗 [File Uploads - GitHub](https://github.com/Greycode009/File-Uploads)

## Today's Progress

- Learned **`multipart/form-data`** and how file uploads differ from JSON
- Implemented **Multer single-file uploads**
- Added **image type & 2 MB size validation**
- Built **upload error handling** with clean JSON responses
- Organized the upload feature using **routes, controllers & middleware** and tested the complete flow

## What I Learned

Today I started learning **File Uploads in Node.js and Express.js**.

I learned how `multipart/form-data` works and why `express.json()` cannot handle file uploads. I then used **Multer** to process uploaded files and understood the difference between `req.body` and `req.file`.

I also learned how to validate uploaded files using their MIME type and limit the maximum file size. Finally, I separated the upload logic into proper **routes, controllers, and middleware** instead of keeping everything inside `app.js`.

## Status

**Day 19 Complete ✅**

### Next

Continue with **File Storage, Multiple Uploads, and File Management**.