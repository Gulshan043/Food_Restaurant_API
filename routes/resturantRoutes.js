const express = require("express");

const authMiddleware = require("../middlewaare/authMiddleware");
const {
  createResturantController,
  getAllResturants,
  getResturantByIdController,
  deleteResturantController,
} = require("../controller/resturantCotroller");

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Restaurants
 *   description: API endpoints for managing restaurants
 */

/**
 * @swagger
 * /api/v1/restaurants/create:
 *   post:
 *     summary: Create a new restaurant
 *     tags: [Restaurants]
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
 *                 example: "The Gourmet Kitchen"
 *               address:
 *                 type: string
 *                 example: "123 Main Street, New York"
 *               cuisine:
 *                 type: string
 *                 example: "Italian"
 *     responses:
 *       201:
 *         description: Restaurant created successfully
 */
router.post("/create", authMiddleware, createResturantController);

/**
 * @swagger
 * /api/v1/resturant/getAll:
 *   get:
 *     summary: Get all restaurants
 *     tags: [Restaurants]
 *     responses:
 *       200:
 *         description: List of all restaurants
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: string
 *                     example: "64bf11b3cd7b3a001c45fda3"
 *                   name:
 *                     type: string
 *                     example: "The Gourmet Kitchen"
 *                   address:
 *                     type: string
 *                     example: "123 Main Street, New York"
 *                   cuisine:
 *                     type: string
 *                     example: "Italian"
 */
router.get("/getAll", getAllResturants);

/**
 * @swagger
 * /api/v1/resturant/get/{id}:
 *   get:
 *     summary: Get a resturant by ID
 *     tags: [Restaurants]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         example: "64bf11b3cd7b3a001c45fda3"
 *     responses:
 *       200:
 *         description: Restaurant details retrieved successfully
 *       404:
 *         description: Restaurant not found
 */
router.get("/get/:id", getResturantByIdController);

/**
 * @swagger
 * /api/v1/resturant/delete/{id}:
 *   delete:
 *     summary: Delete a restaurant by ID
 *     tags: [Restaurants]
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
 *         description: Restaurant deleted successfully
 *       404:
 *         description: Restaurant not found
 */
router.delete("/delete/:id", authMiddleware, deleteResturantController);

module.exports = router;
