import express from "express";
import { createBlueprint, getBlueprints } from "../controllers/blueprints.js";
const router = express.Router();

router.route("/").post(createBlueprint).get(getBlueprints);

export default router;
