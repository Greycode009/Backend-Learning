import mongoose from "mongoose";
import dns from "node:dns"
import config from "./config.js";

dns.setServers(["1.1.1.1"]);

async function connectDB() {
  await mongoose.connect(config.MONGO_URI);
  console.log("Database connected successfully.");
}

export default connectDB;
