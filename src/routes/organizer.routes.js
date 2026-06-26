import express from "express";
import {
  createEvent,
  getEvents,
  getEventById,
  updateEvent,
  deleteEvent,
} from "../controllers/event.controller.js";

import { protect } from "../middlewares/auth.middleware.js";
import { authorize } from "../middlewares/role.middleware.js";

const router = express.Router();

/**
 * @swagger
 * /api/events/events:
 *   post:
 *     tags: [Organizer Events]
 *     summary: Create event (Organizer only)
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
 */
router.post(
  "/events",
  protect,
  authorize("organizer"),
  createEvent
);

/**
 * @swagger
 * /api/events/events:
 *   get:
 *     tags: [Organizer Events]
 *     summary: Get organizer events
 *     security:
 *       - bearerAuth: []
 */
router.get(
  "/events",
  protect,
  authorize("organizer"),
  getEvents
);

/**
 * @swagger
 * /api/events/events/{id}:
 *   get:
 *     tags: [Organizer Events]
 *     summary: Get event by ID
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 */
router.get(
  "/events/:id",
  protect,
  authorize("organizer"),
  getEventById
);

/**
 * @swagger
 * /api/events/events/{id}:
 *   put:
 *     tags: [Organizer Events]
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
 *       404:
 *         description: Event not found
 */
router.put(
  "/events/:id",
  protect,
  authorize("organizer"),
  updateEvent
);

/**
 * @swagger
 * /api/events/events/{id}:
 *   delete:
 *     tags: [Organizer Events]
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
  "/events/:id",
  protect,
  authorize("organizer"),
  deleteEvent
);

export default router;