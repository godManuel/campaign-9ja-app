import express from "express";
import {
  createProject,
  getProjects,
} from "../controllers/previous_achievements.js";
const router = express.Router();
import { protect, authorize } from "../middlewares/auth.js";

router.route("/").post(protect, authorize("admin"), createProject);
router.route("/:id").get(getProjects);

export default router;
