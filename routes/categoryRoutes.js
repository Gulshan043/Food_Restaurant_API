const express = require("express");
const authMiddleware = require("../middlewaare/authMiddleware");
const {
  createCategoryController,
  getAllCategoryController,
  updateCategoryController,
  deleteCategoryController,
} = require("../controller/categoryController");

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Categories
 *   description: Category management APIs
 */

/**
 * @swagger
 * /api/v1/category/create:
 *   post:
 *     summary: Create a new category
 *     tags: [Categories]
 *     security:
 *       - BearerAuth: []
 *     responses:
 *       201:
 *         description: Category created successfully
 */
router.post("/create", authMiddleware, createCategoryController);

/**
 * @swagger
 * /api/v1/category/getAll:
 *   get:
 *     summary: Get all categories
 *     tags: [Categories]
 *     responses:
 *       200:
 *         description: List of categories
 */
router.get("/getAll", getAllCategoryController);

/**
 * @swagger
 * /api/v1/category/update/{id}:
 *   put:
 *     summary: Update a category
 *     tags: [Categories]
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: Category ID
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Category updated successfully
 */
router.put("/update/:id", authMiddleware, updateCategoryController);

/**
 * @swagger
 * /api/v1/category/delete/{id}:
 *   delete:
 *     summary: Delete a category
 *     tags: [Categories]
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: Category ID
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Category deleted successfully
 */
router.delete("/delete/:id", authMiddleware, deleteCategoryController);

module.exports = router;
