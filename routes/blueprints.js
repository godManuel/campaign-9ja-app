import express from "express";
import { createBlueprint, getBlueprints } from "../controllers/blueprints.js";
const router = express.Router();
import { protect, authorize } from "../middlewares/auth.js";

router
  .route("/")
  .post(protect, authorize("admin"), createBlueprint)
  .get(getBlueprints);

export default router;
