import express from "express";
import authenticate from "../middleware/authenticate.js";
import upload from "../middleware/upload.js";
import {
  createNews,
  getAllNews,
  updateNews, 
  deleteNews,
} from "../controllers/news.controller.js";

const router = express.Router();

router.post("/", authenticate, upload.single("media"), createNews);

router.put("/:id", authenticate, upload.single("media"), updateNews);

router.get("/", getAllNews);

router.delete("/:id", authenticate, deleteNews);

export default router;
