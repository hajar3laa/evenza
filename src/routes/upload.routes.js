import express from "express";
import { uploadImage } from "../controllers/upload.controller.js";
import multer from "multer";
import { protect } from "../middlewares/auth.middleware.js";

const router = express.Router();

const upload = multer({ dest: "uploads/" });

/**
 * @swagger
 * /api/upload:
 *   post:
 *     tags: [Upload]
 *     summary: Upload image to Cloudinary
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             required:
 *               - image
 *             properties:
 *               image:
 *                 type: string
 *                 format: binary
 *     responses:
 *       200:
 *         description: Image uploaded successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 url:
 *                   type: string
 *                   example: https://res.cloudinary.com/demo/image/upload/sample.jpg
 *       401:
 *         description: Unauthorized
 *       500:
 *         description: Server error
 */
router.post(
  "/",
  protect,
  upload.single("image"),
  uploadImage
);

export default router;