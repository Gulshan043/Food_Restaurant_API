const express = require("express");
const {
  registerController,
  loginController,
} = require("../controller/authController");

const router = express.Router();

//routes
//REGISTER || POST

router.post("/register", registerController);

//Login
router.post("/login", loginController);

module.exports = router;