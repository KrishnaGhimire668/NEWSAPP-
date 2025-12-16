// routes/auth.routes.js
import express from "express";
import {
  registerUser,
  loginUser,
  logoutUser,
  getProfile,
  checkAuth,
  requireLogin
} from "../controllers/auth.controller.js";

const router = express.Router();

// Register
router.post("/register", registerUser);

// Login
router.post("/login", loginUser);

// Logout
router.get("/logout", logoutUser);

// Profile (protected)
router.get("/profile", requireLogin, getProfile);

// Check auth status
router.get("/check", checkAuth);

export default router;
