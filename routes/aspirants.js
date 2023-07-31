import express from "express";
import {
  createAspirant,
  getAspirants,
  getAspirant,
  addAspirantAvatar,
} from "../controllers/aspirants.js";
const router = express.Router();

router.route("/").post(createAspirant).get(getAspirants);
router.route("/:id").get(getAspirant);
router.route("/:id/avatar").put(addAspirantAvatar);

export default router;
