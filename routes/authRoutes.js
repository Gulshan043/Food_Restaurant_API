const express = require("express");
const {
  registerController,
  loginController,
} = require("../controller/authController");

const router = express.Router();

//routes
//REGISTER || POST

/**
 * @swagger
 * tags:
 *   name: Auth
 *   description: Authentication APIs
 */

/**
 * @swagger
 * /api/v1/auth/register:
 *   post:
 *     summary: Register a new user
 *     tags: [Auth]
 *     responses:
 *       200:
 *         description: User registered successfully
 */
router.post("/register", registerController);

/**
 * @swagger
 * /api/v1/auth/login:
 *   post:
 *     summary: User login
 *     tags: [Auth]
 *     responses:
 *       200:
 *         description: User logged in successfully
 */

router.post("/login", loginController);

module.exports = router;
