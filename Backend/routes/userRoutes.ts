import express, { Router } from "express";
import { getUser } from "../controllers/userControllers";
import { authenticateToken } from "../middlewares/authenticateToken";

const router: Router = express.Router();

router.get("/user", authenticateToken, getUser);

export default router;
