const express = require("express");
const {
  getUserController,
  updateUserController,
  updatePasswordController,
  resetPasswordController,
  deleteProfileController,
} = require("../controller/userController");
const authMiddleware = require("../middlewaare/authMiddleware");

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: User
 *   description: API endpoints for managing user profiles
 */

/**
 * @swagger
 * /api/v1/user/getUser:
 *   get:
 *     summary: Get user details
 *     tags: [User]
 *     security:
 *       - BearerAuth: []  # ⬅️ Requires JWT token
 *     responses:
 *       200:
 *         description: User details retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: string
 *                   example: "64bf11b3cd7b3a001c45fda3"
 *                 name:
 *                   type: string
 *                   example: "John Doe"
 *                 email:
 *                   type: string
 *                   example: "johndoe@example.com"
 */
router.get("/getUser", authMiddleware, getUserController);

/**
 * @swagger
 * /api/v1/user/updateUser:
 *   put:
 *     summary: Update user details
 *     tags: [User]
 *     security:
 *       - BearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 example: "John Updated"
 *               email:
 *                 type: string
 *                 example: "johnupdated@example.com"
 *     responses:
 *       200:
 *         description: User updated successfully
 */
router.put("/updateUser", authMiddleware, updateUserController);

/**
 * @swagger
 * /api/v1/user/updatePassword:
 *   post:
 *     summary: Update user password
 *     tags: [User]
 *     security:
 *       - BearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               currentPassword:
 *                 type: string
 *                 example: "oldpassword123"
 *               newPassword:
 *                 type: string
 *                 example: "newpassword456"
 *     responses:
 *       200:
 *         description: Password updated successfully
 */
router.post("/updatePassword", authMiddleware, updatePasswordController);

/**
 * @swagger
 * /api/v1/user/resetPassword:
 *   post:
 *     summary: Reset user password
 *     tags: [User]
 *     security:
 *       - BearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 example: "johndoe@example.com"
 *               newPassword:
 *                 type: string
 *                 example: "newpassword123"
 *     responses:
 *       200:
 *         description: Password reset successfully
 */
router.post("/resetPassword", authMiddleware, resetPasswordController);

/**
 * @swagger
 * /api/v1/user/deleteUser/{id}:
 *   delete:
 *     summary: Delete user account
 *     tags: [User]
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         example: "64bf11b3cd7b3a001c45fda3"
 *     responses:
 *       200:
 *         description: User account deleted successfully
 */
router.delete("/deleteUser/:id", authMiddleware, deleteProfileController);

module.exports = router;
