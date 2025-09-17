// index.js

import dotenv from "dotenv";
import { app } from "./app.js";
import ConnectToMongoDB from "./src/db/authUser.db.js";

// Load .env file from same folder
dotenv.config({ path: "./.env" });

const Port = process.env.PORT || 5000;

console.log("Starting the server...");

// Connect to db
ConnectToMongoDB()
  .then(() => {
    app.listen(Port, () => {
      console.log(`🚀 Server is running at PORT: ${Port}`);
    });
  })
  .catch((err) => {
    console.error("❌ MongoDB connection error!", err);
  });
