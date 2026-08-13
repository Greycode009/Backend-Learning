import app from "./src/app.js";
import connectDB from "./src/config/database.js";

connectDB().catch((error) => {
  console.error("Database startup error:", error.message);
});

app.listen(process.env.PORT, () => {
  console.log(`Server is running on port ${process.env.PORT}`);
});
