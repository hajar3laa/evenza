import express from "express";
import {
  createBooking,
  getMyBookings,
  cancelBooking,
} from "../controllers/booking.controller.js";

import {
  protect,
  authorize,
} from "../middlewares/auth.middleware.js";

const router = express.Router();


/**
 * @swagger
 * /api/bookings:
 *   post:
 *     tags: [Bookings]
 *     summary: Create a new booking
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - eventId
 *               - quantity
 *             properties:
 *               eventId:
 *                 type: string
 *                 example: 685a7d4d0a123456789abcd1
 *               quantity:
 *                 type: number
 *                 example: 2
 *               couponCode:
 *                 type: string
 *                 example: SUMMER20
 *               paymentMethod:
 *                 type: string
 *                 example: card
 *     responses:
 *       201:
 *         description: Booking created successfully
 *       400:
 *         description: Invalid coupon or not enough available seats
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: Event not found
 */
router.post(
  "/",
  protect,
  authorize("user", "organizer", "admin"),
  createBooking
);

/**
 * @swagger
 * /api/bookings/my:
 *   get:
 *     tags: [Bookings]
 *     summary: Get current user bookings
 *     security:
 *       - bearerAuth: []
 */
router.get(
  "/my",
  protect,
  getMyBookings
);

/**
 * @swagger
 * /api/bookings/{id}:
 *   delete:
 *     tags: [Bookings]
 *     summary: Cancel booking
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 */
router.delete(
  "/:id",
  protect,
  cancelBooking
);

export default router;