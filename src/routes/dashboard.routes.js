import express from "express";

import {
  userDashboard,
  organizerDashboard,
  adminDashboard,
} from "../controllers/dashboard.controller.js";

import {
  protect,
  authorize,
} from "../middlewares/auth.middleware.js";

const router = express.Router();

/**
 * @swagger
 * /api/dashboards/user:
 *   get:
 *     tags: [Dashboard]
 *     summary: Get user dashboard statistics
 *     security:
 *       - bearerAuth: []
 */
router.get(
  "/user",
  protect,
  authorize("user", "organizer", "admin"),
  userDashboard
);

/**
 * @swagger
 * /api/dashboards/organizer:
 *   get:
 *     tags: [Dashboard]
 *     summary: Get organizer dashboard statistics
 *     security:
 *       - bearerAuth: []
 */
router.get(
  "/organizer",
  protect,
  authorize("organizer"),
  organizerDashboard
);

/**
 * @swagger
 * /api/dashboards/admin:
 *   get:
 *     tags: [Dashboard]
 *     summary: Get admin dashboard statistics
 *     security:
 *       - bearerAuth: []
 */
router.get(
  "/admin",
  protect,
  authorize("admin"),
  adminDashboard
);

export default router;