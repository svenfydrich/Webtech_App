import express, { Application } from "express";
import travelRoutes from "./routes/travels";
import cors from "cors";
import connectDB from "./db";
import dotenv from "dotenv";

// Route imports
import authRoutes from "./routes/authRoutes";
import userRoutes from "./routes/userRoutes";

// Server configuration
dotenv.config();
const port: number = parseInt(process.env.PORT || "1337", 10);
const app: Application = express();

// Middleware and Routes
app.use(cors({ origin: "http://localhost:3000" }));
app.use(express.json());
app.use(express.static("public"));
app.use("/api/travels", travelRoutes);
app.use("/api", authRoutes);
app.use("/api", userRoutes);

// Run server
const startServer = async (): Promise<void> => {
  try {
    await connectDB();
    app.listen(port, () => {
      console.log(
        `Server lauscht auf Hafen ${port}, a.k.a server running on port ${port}.`
      );
    });
  } catch (error) {
    console.error("Error starting server:", error);
    process.exit(1);
  }
};

startServer();

export default app;
