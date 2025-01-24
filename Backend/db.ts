import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

// Database setup
const connectDB = async (): Promise<void> => {
  try {
    const dbURI =
      process.env.MONGODB_URI ||
      "mongodb+srv://fydrichsven:N1k9rFa2s1bmWBUd@journeydb.cpj1t.mongodb.net/";
    await mongoose.connect(dbURI);
    console.log("🚀 MongoDB-Verbindung aufgebaut!");
  } catch (err) {
    console.error("❌ Verbindung zu MongoDB fehlgeschlagen", err);
    process.exit(1);
  }
};

export default connectDB;
