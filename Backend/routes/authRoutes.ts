import express, { Router } from "express";
import { register, login } from "../controllers/authControllers";

const router: Router = express.Router();

// Routing for login + registration
router.post("/register", register);
router.post("/login", login);

export default router;
