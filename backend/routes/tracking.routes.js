import { Router } from "express";
import { getTrackings } from "../controllers/tracking.controller.js";
import { authenticate } from "../middlewares/auth.middleware.js";
import { createTracking } from "../controllers/tracking.controller.js";
import { createVote } from "../controllers/tracking.controller.js";
import { updateTracking } from "../controllers/tracking.controller.js";

const router = Router();

router.get("/", authenticate, getTrackings);
router.post("/", authenticate, createTracking);
router.post("/:id/vote", authenticate, createVote);
router.put("/:id", authenticate, updateTracking);

export default router;
