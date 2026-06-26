import express from "express";
import { protect } from "../middlewares/auth.middleware.js";
import { updateProfile } from "../controllers/user.controller.js";

const router = express.Router();

/**
 * @swagger
 * /api/users/profile:
 *   put:
 *     tags: [Users]
 *     summary: Update user profile
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 example: Ahmed Mohamed
 *               profileImage:
 *                 type: string
 *                 example: https://res.cloudinary.com/demo/image/upload/profile.jpg
 *     responses:
 *       200:
 *         description: Profile updated successfully
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: User not found
 *       500:
 *         description: Server error
 */
router.put(
  "/profile",
  protect,
  updateProfile
);

export default router;