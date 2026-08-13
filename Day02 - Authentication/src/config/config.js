import dotenv from "dotenv";

dotenv.config();

if (!process.env.MONGO_URI) {
  throw new Error("MONGO_URI is not defined in environment variables");
}
if (!process.env.PORT) {
  throw new Error("PORT is not defined in environment variables");
}
if (!process.env.JWT_SECRET) {
  throw new Error("JWT_SECRET is not defined in environment variables");
}
if (!process.env.ACCESS_TOKEN_EXPIRATION) {
  throw new Error("ACCESS_TOKEN_EXPIRATION is not defined in environment variables");
}
if (!process.env.REFRESH_TOKEN_EXPIRATION) {
  throw new Error("REFRESH_TOKEN_EXPIRATION is not defined in environment variables");
}

const config = {
  MONGO_URI: process.env.MONGO_URI,
  PORT: process.env.PORT || 3000,
  JWT_SECRET: process.env.JWT_SECRET,
  ACCESS_TOKEN_EXPIRATION: process.env.ACCESS_TOKEN_EXPIRATION,
  REFRESH_TOKEN_EXPIRATION: process.env.REFRESH_TOKEN_EXPIRATION,
};

export default config;
