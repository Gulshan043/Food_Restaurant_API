const express = require("express");

const authMiddleware = require("../middlewaare/authMiddleware");
const {
  createResturantController,
  getAllResturants,
  getResturantById,
  getResturantByIdController,
  deleteResturantController,
} = require("../controller/resturantCotroller");

const router = express.Router();

//routes
// Create Resturant || POST
router.post("/create", authMiddleware, createResturantController);

//Get All Resturant || GET
router.get("/getAll", getAllResturants);

// GET Resturant By Id || GET
router.get("/get/:id", getResturantByIdController);

// DELETE Resturant || DELETE
router.delete("/delete/:id", authMiddleware, deleteResturantController);
module.exports = router;
