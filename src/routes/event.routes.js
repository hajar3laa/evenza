import express from "express";

import {
  createEvent,
  getEvents,
  getEventById,
  getFeaturedEvents,
  toggleFeaturedEvent,
  updateEvent,
  deleteEvent,
} from "../controllers/event.controller.js";

import {
  protect,
  authorize,
} from "../middlewares/auth.middleware.js";

const router = express.Router();

/**
 * @swagger
 * /api/events:
 *   post:
 *     tags: [Events]
 *     summary: Create a new event
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - title
 *               - description
 *               - date
 *               - location
 *               - price
 *               - capacity
 *             properties:
 *               title:
 *                 type: string
 *                 example: Tech Conference 2026
 *               description:
 *                 type: string
 *                 example: Annual technology conference
 *               date:
 *                 type: string
 *                 format: date-time
 *                 example: "2026-12-01T10:00:00.000Z"
 *               location:
 *                 type: string
 *                 example: Cairo
 *               price:
 *                 type: number
 *                 example: 250
 *               capacity:
 *                 type: integer
 *                 example: 100
 *               images:
 *                 type: array
 *                 items:
 *                   type: string
 *                 example:
 *                   - https://example.com/image1.jpg
 *                   - https://example.com/image2.jpg
 *               category:
 *                 type: string
 *                 example: Technology
 *               tags:
 *                 type: array
 *                 items:
 *                   type: string
 *                 example:
 *                   - tech
 *                   - conference
 *     responses:
 *       201:
 *         description: Event created successfully
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Access denied
 */
router.post(
  "/",
  protect,
  authorize("organizer", "admin"),
  createEvent
);

/**
 * @swagger
 * /api/events:
 *   get:
 *     tags: [Events]
 *     summary: Get all events
 */
router.get("/", getEvents);

/**
 * @swagger
 * /api/events/featured:
 *   get:
 *     tags: [Events]
 *     summary: Get featured events
 */
router.get("/featured", getFeaturedEvents);

/**
 * @swagger
 * /api/events/{id}:
 *   get:
 *     tags: [Events]
 *     summary: Get event by ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 */
router.get("/:id", getEventById);

/**
 * @swagger
 * /api/events/{id}/featured:
 *   put:
 *     tags: [Events]
 *     summary: Toggle featured event
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 */
router.put(
  "/:id/featured",
  protect,
  authorize("admin"),
  toggleFeaturedEvent
);

/**
 * @swagger
 * /api/events/{id}:
 *   put:
 *     tags: [Events]
 *     summary: Update event
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *               description:
 *                 type: string
 *               date:
 *                 type: string
 *                 format: date-time
 *               location:
 *                 type: string
 *               price:
 *                 type: number
 *               capacity:
 *                 type: integer
 *               images:
 *                 type: array
 *                 items:
 *                   type: string
 *               category:
 *                 type: string
 *               tags:
 *                 type: array
 *                 items:
 *                   type: string
 *     responses:
 *       200:
 *         description: Event updated successfully
 *       403:
 *         description: Access denied
 *       404:
 *         description: Event not found
 */
router.put(
  "/:id",
  protect,
  authorize("organizer", "admin"),
  updateEvent
);

/**
 * @swagger
 * /api/events/{id}:
 *   delete:
 *     tags: [Events]
 *     summary: Delete event
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
  authorize("organizer", "admin"),
  deleteEvent
);

export default router;