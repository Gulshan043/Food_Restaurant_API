const express = require("express");
const {
  getUserController,
  updateUser,
  updateUserController,
  updatePasswordController,
  resetPasswordController,
  deleteProfileController,
} = require("../controller/userController");
const authMiddleware = require("../middlewaare/authMiddleware");

const router = express.Router();

//routes
// GET user || GET
router.get("/getUser", authMiddleware, getUserController);

// UPDATE USER || PUT
router.put("/updateUser", authMiddleware, updateUserController);

// password update
router.post("/updatePassword", authMiddleware, updatePasswordController);

// reset password
router.post("/resetPassword", authMiddleware, resetPasswordController);

// deleter account
router.delete("/deleteUser/:id", authMiddleware, deleteProfileController);
module.exports = router;
