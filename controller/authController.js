const userModel = require("../models/userModel");
const bcrypt = require("bcryptjs");
const JWT = require("jsonwebtoken");

// ---------------- Register ------------------
const registerController = async (req, res) => {
  try {
    const { userName, email, password, phone, address, answer } = req.body;

    // validation
    if (!userName || !email || !password || !address || !phone || !answer) {
      // if any field is remaining to fill
      return res.status(500).send({
        success: false,
        message: "Please provide all fields",
      });
    }

    //check user
    const exisiting = await userModel.findOne({ email }); // check email id is already registered or not and findOne is method of mongoose
    if (exisiting) {
      return res.status(500).send({
        success: false,
        message: "Email address is already registered please login",
      });
    }

    // hashing password
    let salt = bcrypt.genSaltSync(10);
    const hashPassword = await bcrypt.hash(password, salt);

    // create new user
    const user = await userModel.create({
      // this will create new user in data base and create is method of mongoose
      userName,
      email,
      password: hashPassword,
      address,
      phone,
      answer,
    });
    res.status(201).send({
      success: true,
      message: "successfully Registered",
      user,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error in auth Register API",
      error,
    });
  }
};

// ----------------- Login --------------------
const loginController = async (req, res) => {
  try {
    const { email, password } = req.body;

    // validation
    if (!email || !password) {
      return res.status(500).send({
        success: false,
        message: "Please Provide Email and Password",
      });
    }

    // check user
    const user = await userModel.findOne({ email });
    if (!user) {
      return res.status(404).send({
        success: false,
        message: "User not found",
      });
    }

    // Check user password | Compare password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(500).send({
        success: false,
        message: "invalid credintials",
      });
    }

    // token
    const JWT_Key = process.env.JWT;
    const token = JWT.sign({ id: user._id }, JWT_Key, {
      expiresIn: "7d",
    });
    user.password = undefined; // to hide password in response object
    res.status(200).send({
      success: true,
      message: "Login successfully",
      token,
      user,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "error in login controller",
    });
  }
};

module.exports = { registerController, loginController };
