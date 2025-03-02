const express = require("express");
const authMiddleware = require("../middlewaare/authMiddleware");
const {
  createFoodController,
  getAllFoodController,
  getFoodByIdController,
  getFoodByResturantController,
  updateFoodController,
  deleteFoodItemController,
  placeOrderController,
  orderStatusController,
} = require("../controller/foodController");
const adminMiddleware = require("../middlewaare/adminMiddleware");

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Foods
 *   description: Food management APIs
 */

/**
 * @swagger
 * /api/v1/food/create:
 *   post:
 *     summary: Create a new food item
 *     tags: [Foods]
 *     security:
 *       - BearerAuth: []
 *     responses:
 *       201:
 *         description: Food item created successfully
 */
router.post("/create", authMiddleware, createFoodController);

/**
 * @swagger
 * /api/v1/food/getAll:
 *   get:
 *     summary: Get all food items
 *     tags: [Foods]
 *     responses:
 *       200:
 *         description: List of food items
 */
router.get("/getAll", getAllFoodController);

/**
 * @swagger
 * /api/v1/food/get/{id}:
 *   get:
 *     summary: Get food item by ID
 *     tags: [Foods]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: Food ID
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Food item retrieved successfully
 */
router.get("/get/:id", getFoodByIdController);

/**
 * @swagger
 * /api/v1/food/getByResturant/{id}:
 *   get:
 *     summary: Get all food items by restaurant ID
 *     tags: [Foods]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: Restaurant ID
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: List of food items from the restaurant
 */
router.get("/getByResturant/:id", getFoodByResturantController);

/**
 * @swagger
 * /api/v1/food/update/{id}:
 *   put:
 *     summary: Update a food item
 *     tags: [Foods]
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: Food ID
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Food item updated successfully
 */
router.put("/update/:id", authMiddleware, updateFoodController);

/**
 * @swagger
 * /api/v1/food/delete/{id}:
 *   delete:
 *     summary: Delete a food item
 *     tags: [Foods]
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: Food ID
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Food item deleted successfully
 */
router.delete("/delete/:id", authMiddleware, deleteFoodItemController);

module.exports = router;
