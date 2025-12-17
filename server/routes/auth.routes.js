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

router.post("/register", registerUser);

router.post("/login", loginUser);

router.get("/logout", logoutUser);

router.get("/profile", requireLogin, getProfile);

router.get("/check", checkAuth);

export default router;
