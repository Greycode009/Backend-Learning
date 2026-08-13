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
if (!process.env.TOKEN_EXPIRATION) {
  throw new Error("TOKEN_EXPIRATION is not defined in environment variables");
}

const config = {
  MONGO_URI: process.env.MONGO_URI,
  PORT: process.env.PORT || 3000,
  JWT_SECRET: process.env.JWT_SECRET,
  TOKEN_EXPIRATION: process.env.TOKEN_EXPIRATION,
};

export default config;
