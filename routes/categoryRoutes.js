const express = require("express");

const authMiddleware = require("../middlewaare/authMiddleware");
const {
  createCategoryController,
  getAllCategoryController,
  updateCategoryController,
  deleteCategoryController,
} = require("../controller/categoryController");

const router = express.Router();

//routes
// Create category || POST
router.post("/create", authMiddleware, createCategoryController);

// get all category || GET
router.get("/getAll", getAllCategoryController);

// update Category || PUt
router.put("/update/:id", authMiddleware, updateCategoryController);

//delete Category || DELETE
router.delete("/delete/:id", authMiddleware, deleteCategoryController);
module.exports = router;
