import express from "express";
import { protectRoutes } from "../middlewares/auth.middleware.js";
import { getCoupon, validateCoupon } from "../controllers/coupon.controller.js";


const router = express.Router();

router.get("/", protectRoutes, getCoupon);
router.post("/validate", protectRoutes, validateCoupon);

export default router;