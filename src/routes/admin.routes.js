import express from "express";

import {
  getAllUsers,
  updateUserRole,
  deleteUser,
  approveEvent,
  rejectEvent,
} from "../controllers/admin.controller.js";

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
 * /api/admin/users:
 *   get:
 *     summary: Get all users
 *     tags: [Admin]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of users
 */
router.get("/users", getAllUsers);

/**
 * @swagger
 * /api/admin/users/{id}/role:
 *   put:
 *     summary: Update user role
 *     tags: [Admin]
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
 *             required:
 *               - role
 *             properties:
 *               role:
 *                 type: string
 *                 enum:
 *                   - user
 *                   - organizer
 *                   - admin
 *                 example: organizer
 *     responses:
 *       200:
 *         description: User role updated successfully
 *       404:
 *         description: User not found
 *       401:
 *         description: Unauthorized
 */
router.put(
  "/users/:id/role",
  updateUserRole
);

/**
 * @swagger
 * /api/admin/users/{id}:
 *   delete:
 *     summary: Delete user
 *     tags: [Admin]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: User deleted successfully
 */
router.delete(
  "/users/:id",
  deleteUser
);

/**
 * @swagger
 * /api/admin/events/{id}/approve:
 *   put:
 *     summary: Approve event
 *     tags: [Admin]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Event approved successfully
 */
router.put(
  "/events/:id/approve",
  protect,
  authorize("admin"),
  approveEvent
);

/**
 * @swagger
 * /api/admin/events/{id}/reject:
 *   put:
 *     summary: Reject event
 *     tags: [Admin]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Event rejected successfully
 */
router.put(
  "/events/:id/reject",
  rejectEvent
);

export default router;