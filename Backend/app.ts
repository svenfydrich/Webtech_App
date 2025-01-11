import express, { Application } from "express";
import travelRoutes from "./routes/travels";
import cors from "cors";
import connectDB from "./db";

const app: Application = express();
const PORT: number = 1337;

//Configure Middleware and Routes
app.use(cors());
app.use(express.json());
app.use(express.static("public"));
app.use("/api/travels", travelRoutes);

//Run server
const startServer = async (): Promise<void> => {
  await connectDB();
  app.listen(PORT, () => {
    console.log(`Der Express Server läuft jetzt.`);
  });
};

startServer();
