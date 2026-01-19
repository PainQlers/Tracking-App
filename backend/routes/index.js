import { Router } from "express";
import { check } from "../controllers/health.controller.js";
import authRoutes from "./auth.routes.js"
import trackingRoutes from "./tracking.routes.js"
import chartRoutes from "./chart.routes.js"

const router = Router();

router.get("/health", check);
router.use("/auth", authRoutes);
router.use("/trackings", trackingRoutes);
router.use("/chart", chartRoutes);

export default router;