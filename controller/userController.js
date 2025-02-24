// ------------- Get User Info -------------------------

const userModel = require("../models/userModel");
const bcrypt = require("bcryptjs");
const getUserController = async (req, res) => {
  try {
    // find user
    const user = await userModel.findById({ _id: req.body.id });
    // validation
    if (!user) {
      res.status(404).send({
        success: false,
        message: "User not found",
      });
    }

    // hide password
    user.password = undefined;

    //resp
    res.status(200).send({
      success: true,
      message: "user data get successfully",
      user,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error in get user API",
      error,
    });
  }
};

// -------------------------------- update user Info --------------------
const updateUserController = async (req, res) => {
  try {
    // find user
    const user = await userModel.findById({ _id: req.body.id });
    if (!user) {
      return res.status(404).send({
        success: false,
        message: "User not found",
      });
    }

    //update user details
    const { userName, address, phone } = req.body;
    if (userName) user.userName = userName;
    if (address) user.address = address;
    if (phone) user.phone = phone;

    //save user
    await user.save();
    res.status(200).send({
      success: true,
      message: "User Updated Successfully",
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error in Update user API",
      error,
    });
  }
};

// ------------------------------ update password ------------------------
const updatePasswordController = async (req, res) => {
  try {
    // Fetch user with await
    const user = await userModel.findById({ _id: req.body.id });

    // Check if user exists
    if (!user) {
      return res.status(404).send({
        success: false,
        message: "User not found",
      });
    }

    // Extract passwords from request body (fixing res.body → req.body)
    const { oldPassword, newPassword } = req.body;

    // Validate inputs
    if (!oldPassword || !newPassword) {
      return res.status(400).send({
        success: false,
        message: "Please provide both old and new password",
      });
    }

    // Compare old password with hashed password in database
    const isMatch = await bcrypt.compare(oldPassword, user.password);
    if (!isMatch) {
      return res.status(400).send({
        success: false,
        message: "Invalid old password",
      });
    }

    // Generate salt and hash the new password
    const salt = bcrypt.genSaltSync(10);
    const hashedPassword = await bcrypt.hash(newPassword, salt);
    user.password = hashedPassword;

    // Save updated password
    await user.save({ validateBeforeSave: false });
    res.status(200).send({
      success: true,
      message: "Password updated successfully",
    });
  } catch (error) {
    console.error(error);
    res.status(500).send({
      success: false,
      message: "Error in update password API",
      error,
    });
  }
};

// ------------------------- Reset Password --------------------------
const resetPasswordController = async (req, res) => {
  try {
    const { email, newPassword, answer } = req.body;
    if (!email || !newPassword || !answer) {
      return res.status(404).send({
        success: false,
        message: "Please Provide all Fields",
      });
    }
    const user = await userModel.findOne({ email, answer });
    if (!user) {
      return res.status(500).send({
        success: false,
        message: "User not found or Invalid Answer",
      });
    }

    //hashing password
    let salt = bcrypt.genSaltSync(10);
    const hashPassword = await bcrypt.hash(newPassword, salt);
    user.password = hashPassword;
    await user.save();
    res.status(200).send({
      success: true,
      message: "Reset Password Successfully",
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error in reset password API",
      error,
    });
  }
};

// ---------------------- delete Account ----------
const deleteProfileController = async (req, res) => {
  try {
    await userModel.findByIdAndDelete(req.params.id);
    return res.status(200).send({
      success: true,
      message: "Account has been Deleted",
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error in delete Profile API",
    });
  }
};
module.exports = {
  getUserController,
  updateUserController,
  updatePasswordController,
  resetPasswordController,
  deleteProfileController,
};
