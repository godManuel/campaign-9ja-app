import express from "express";
import { createFeed, getFeeds } from "../controllers/feeds.js";
const router = express.Router();
import { protect, authorize } from "../middlewares/auth.js";

router.route("/").post(protect, authorize("admin"), createFeed).get(getFeeds);

export default router;
