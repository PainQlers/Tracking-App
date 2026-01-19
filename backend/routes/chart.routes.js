import { Router } from "express";
import { authenticate } from "../middlewares/auth.middleware.js";
import { getSummary } from "../controllers/chart.controller.js";

const router = Router();

router.get("/summary", authenticate, getSummary);

export default router;