import express from "express";
import {
  createAspirant,
  getAspirants,
  getAspirant,
  addAspirantAvatar,
} from "../controllers/aspirants.js";
const router = express.Router();

import { protect, authorize } from "../middlewares/auth.js";

router
  .route("/")
  .post(protect, authorize("admin"), createAspirant)
  .get(getAspirants);
router.route("/:id").get(getAspirant);
router.route("/:id/avatar").put(protect, authorize("admin"), addAspirantAvatar);

export default router;
