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

//routes
// Create Food || POST
router.post("/create", authMiddleware, createFoodController);

// GET All Foods || GET
router.get("/getAll", getAllFoodController);

// GET Foods by Id || GET
router.get("/get/:id", getFoodByIdController);

// GET Foods by Resturant Id || GET
router.get("/getByResturant/:id", getFoodByResturantController);

// Update Food || PUT
router.put("/update/:id", authMiddleware, updateFoodController);

// Delete Food Item || DELETE
router.delete("/delete/:id", authMiddleware, deleteFoodItemController);

// Place Order || POST
router.post("/placeOrder", authMiddleware, placeOrderController);

// Order Status || POST
router.post(
  "/orderStatus/:id",
  authMiddleware,
  adminMiddleware,
  orderStatusController
);

module.exports = router;
