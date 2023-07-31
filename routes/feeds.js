import express from "express";
import { createFeed, getFeeds } from "../controllers/feeds.js";
const router = express.Router();

router.route("/").post(createFeed).get(getFeeds);

export default router;
