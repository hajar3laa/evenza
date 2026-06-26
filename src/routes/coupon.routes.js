import express from "express";

import {
  createCoupon,
  getCoupons,
  deleteCoupon,
} from "../controllers/coupon.controller.js";

import {
  protect,
  authorize,
} from "../middlewares/auth.middleware.js";

const router = express.Router();

router.use(
  protect,
  authorize("admin")
);

/**
 * @swagger
 * /api/coupons:
 *   post:
 *     tags: [Coupons]
 *     summary: Create a new coupon
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - code
 *               - discount
 *               - expiresAt
 *             properties:
 *               code:
 *                 type: string
 *                 example: SUMMER20
 *               discount:
 *                 type: number
 *                 example: 20
 *               expiresAt:
 *                 type: string
 *                 format: date-time
 *                 example: 2026-12-31T23:59:59.000Z
 *               isActive:
 *                 type: boolean
 *                 example: true
 *     responses:
 *       201:
 *         description: Coupon created successfully
 *       400:
 *         description: Invalid coupon data
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Admin access required
 */
router.post("/", createCoupon);

/**
 * @swagger
 * /api/coupons:
 *   get:
 *     tags: [Coupons]
 *     summary: Get all coupons
 *     security:
 *       - bearerAuth: []
 */
router.get("/", getCoupons);

/**
 * @swagger
 * /api/coupons/{id}:
 *   delete:
 *     tags: [Coupons]
 *     summary: Delete coupon
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 */
router.delete("/:id", deleteCoupon);

export default router;