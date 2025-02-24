const foodModel = require("../models/foodModel");
const orderModel = require("../models/orederModel");

// ----------------------------- create food -------------------------------
const createFoodController = async (req, res) => {
  try {
    const {
      title,
      description,
      price,
      imgUrl,
      foodTags,
      category,
      code,
      isAvailable,
      resturant,
      rating,
      reatingCount,
    } = req.body;

    if (!title || !description || !price || !resturant) {
      return res.status(500).send({
        success: false,
        message: "Please Provide All Fields",
      });
    }
    const newFood = new foodModel({
      title,
      description,
      price,
      imgUrl,
      foodTags,
      category,
      code,
      isAvailable,
      resturant,
      rating,
      reatingCount,
    });

    await newFood.save();
    res.status(201).send({
      success: true,
      message: "New food item created",
      newFood,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error in create food API",
      error,
    });
  }
};

// ----------------------------- get all foods ---------------------------------
const getAllFoodController = async (req, res) => {
  try {
    const foods = await foodModel.find({});
    if (!foods) {
      return res.status(500).send({
        success: false,
        message: "No foods item was found",
      });
    }
    res.status(200).send({
      success: true,
      totalFoods: foods.length,
      foods,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error in get all food API",
      error,
    });
  }
};

// ---------------------------------------- get food by id -----------------------------------------
const getFoodByIdController = async (req, res) => {
  try {
    const foodId = req.params.id;
    if (!foodId) {
      return res.status(404).send({
        success: false,
        message: "Please Provide a valid food id",
      });
    }
    const food = await foodModel.findById(foodId);
    if (!food) {
      return res.status(404).send({
        success: false,
        message: "No food was found with this Id",
      });
    }

    res.status(200).send({
      success: true,
      food,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error In Get Food By Id API",
    });
  }
};

// --------------------------------------- get food by resturant --------------------------------------
const getFoodByResturantController = async (req, res) => {
  try {
    const resturantId = req.params.id;
    if (!resturantId) {
      return res.status(404).send({
        success: false,
        message: "Please Provide a valid food id",
      });
    }
    const food = await foodModel.find({ resturant: resturantId });
    if (!food) {
      return res.status(404).send({
        success: false,
        message: "No food was found with this Id",
      });
    }

    res.status(200).send({
      success: true,
      food,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error In Get Food By Resturant API",
      error,
    });
  }
};

// -------------------------------- Update Food --------------------------------
const updateFoodController = async (req, res) => {
  try {
    const foodId = req.params.id;
    if (!foodId) {
      return res.status(404).send({
        success: false,
        message: "Please Provide A Valid Food Id",
      });
    }
    const food = await foodModel.findById(foodId);
    if (!food) {
      return res.status(404).send({
        success: false,
        message: "No food found for update with this id",
      });
    }
    const {
      title,
      description,
      price,
      imgUrl,
      foodTags,
      category,
      code,
      isAvailable,
      resturant,
      rating,
      reatingCount,
    } = req.body;

    const updatedFood = await foodModel.findByIdAndUpdate(
      foodId,
      {
        title,
        description,
        price,
        imgUrl,
        foodTags,
        category,
        code,
        isAvailable,
        resturant,
        rating,
        reatingCount,
      },
      { new: true }
    );

    res.status(200).send({
      success: true,
      message: "Updated Food Successfully",
      // updatedFood,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error in update food API",
      error,
    });
  }
};

// -------------------- Delete food Item --------------------------
const deleteFoodItemController = async (req, res) => {
  try {
    const foodId = req.params.id;
    if (!foodId) {
      return res.status(404).send({
        success: false,
        message: "Please Provide a valid food id",
      });
    }

    const food = await foodModel.findById(foodId);
    if (!food) {
      return res.status(404).send({
        success: false,
        message: "No food found with this id",
      });
    }

    const foodModal = await foodModel.findByIdAndDelete(foodId);
    res.status(200).send({
      success: true,
      message: "food item deleted",
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error In Delete Food Item API",
      error,
    });
  }
};

// ----------------------- Place Order ---------------------------------------

const placeOrderController = async (req, res) => {
  try {
    const { cart, payment } = req.body;
    if (!cart) {
      return res.status(500).send({
        success: false,
        message: "Please add cart or Payment method",
      });
    }
    let total = 0;
    // calculate total
    cart.map((i) => {
      total += i.price;
    });

    const newOrder = new orderModel({
      foods: cart,
      payment: total,
      buyer: req.body.id,
    });

    await newOrder.save();
    res.status(201).send({
      success: true,
      message: "Order placed successfully",
      newOrder,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error in place order API",
      error,
    });
  }
};

const orderStatusController = async (req, res) => {
  try {
    const orderId = req.params.id;
    if (!orderId) {
      return res.status(404).send({
        success: false,
        message: "Please Provide valid order Id",
      });
    }
    const { status } = req.body;
    const order = await orderModel.findByIdAndUpdate(
      orderId,
      { status },
      { new: true }
    );
    res.status(200).send({
      success: true,
      message: "Order status updated",
      order,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error in order status API",
      error,
    });
  }
};

module.exports = {
  createFoodController,
  getAllFoodController,
  getFoodByIdController,
  getFoodByResturantController,
  updateFoodController,
  deleteFoodItemController,
  placeOrderController,
  orderStatusController,
};
