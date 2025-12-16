import express from "express";
import authenticate from "../middleware/authenticate.js";
import upload from "../middleware/upload.js";
import {
  createNews,
  getAllNews,
  updateNews, // ✅ added updateNews
  deleteNews,
} from "../controllers/news.controller.js";

const router = express.Router();

// Create news (with media)
router.post("/", authenticate, upload.single("media"), createNews);

// Update news (with media)
router.put("/:id", authenticate, upload.single("media"), updateNews);

// Get all news
router.get("/", getAllNews);

// Delete news
router.delete("/:id", authenticate, deleteNews);

export default router;
