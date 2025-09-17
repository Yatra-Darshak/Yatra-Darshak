// authUser.db.js

import mongoose from "mongoose";

const ConnectToMongoDB = async () => {
    
  try {
    console.log("Hello from here");
    console.log(process.env.MONGO_URL);
    if (!process.env.MONGO_URL) {
      throw new Error("MONGO_URL is not defined in environment variables");
    }
    const connected = await mongoose.connect("mongodb://localhost:27017/YatraDarshak");

    console.log(`\nMongoDb connected ! DB host: ${connected.connection.host}`);

  } catch (error) {
    
    console.log("Mongo DB connection error!!", error);
  }
};

export default ConnectToMongoDB;