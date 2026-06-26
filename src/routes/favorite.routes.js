import express from "express";
import {
  addFavorite,
  getFavorites,
  removeFavorite,
} from "../controllers/favorite.controller.js";

import { protect } from "../middlewares/auth.middleware.js";

const router = express.Router();

/**
 * @swagger
 * /api/favorites/{eventId}:
 *   post:
 *     tags: [Favorites]
 *     summary: Add event to favorites
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: eventId
 *         required: true
 *         schema:
 *           type: string
 */
router.post(
  "/:eventId",
  protect,
  addFavorite
);

/**
 * @swagger
 * /api/favorites:
 *   get:
 *     tags: [Favorites]
 *     summary: Get user favorite events
 *     security:
 *       - bearerAuth: []
 */
router.get(
  "/",
  protect,
  getFavorites
);

/**
 * @swagger
 * /api/favorites/{eventId}:
 *   delete:
 *     tags: [Favorites]
 *     summary: Remove event from favorites
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: eventId
 *         required: true
 *         schema:
 *           type: string
 */
router.delete(
  "/:eventId",
  protect,
  removeFavorite
);

export default router;