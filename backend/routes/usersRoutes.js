import express from "express";
import { registerUser, loginUser } from "../controllers/usersController.js";

const router = express.Router();

// Register user routes
router.post("/", registerUser);

// Login user routes
router.post("/login", loginUser);

export { router as usersRoutes };
