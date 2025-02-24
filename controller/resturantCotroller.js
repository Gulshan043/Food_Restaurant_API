const resturantModel = require("../models/resturantModel");

// -------------------------- Create Resturant ---------------------
const createResturantController = async (req, res) => {
  try {
    const {
      title,
      imgUrl,
      foods,
      time,
      pickup,
      delivery,
      isOpen,
      logoUrl,
      rating,
      ratingCount,
      code,
      coords,
    } = req.body;
    if (!title || !coords) {
      return res.status(500).send({
        success: false,
        message: "Please Provide title and address",
      });
    }

    // create new resturants
    const newResturant = new resturantModel({
      title,
      imgUrl,
      foods,
      time,
      pickup,
      delivery,
      isOpen,
      logoUrl,
      rating,
      ratingCount,
      code,
      coords,
    });

    await newResturant.save();
    res.status(201).send({
      success: true,
      message: "New Resturant Created Successfully",
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error in create resturant API",
      error,
    });
  }
};

// ------------------------------------ get all resturants --------------------------------
const getAllResturants = async (req, res) => {
  try {
    const resturants = await resturantModel.find({});
    if (!resturants) {
      return res.status(404).send({
        success: false,
        message: "No Resturant Avilable",
      });
    }
    res.status(200).send({
      success: true,
      totalCount: resturants.length,
      resturants,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error in getAllResturant API",
      error,
    });
  }
};

// ----------------------------- Get Resturant By Id ----------------------------------
const getResturantByIdController = async (req, res) => {
  try {
    const resturantId = req.params.id;
    if (!resturantId) {
      return res.status(404).send({
        success: false,
        message: "Please provide valid resturant id",
      });
    }
    //find resturant
    const resturant = await resturantModel.findById(resturantId);
    if (!resturant) {
      return res.status(404).send({
        success: false,
        message: "No Resturant found",
      });
    }

    res.status(200).send({
      success: true,
      resturant,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error in get resturant by id API",
    });
  }
};

// ---------------------------------------- Delete Resturant ------------------------------------------
const deleteResturantController = async (req, res) => {
  try {
    const resturantId = req.params.id;
    if (!resturantId) {
      return res.status(404).send({
        success: false,
        message: "Resturan not found or Please Provide Valid Resturant ID",
      });
    }

    // Delete
    await resturantModel.findByIdAndDelete(resturantId);
    res.status(200).send({
      success: true,
      message: "Resturant Deleted",
    });
  } catch (error) { 
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error in delete Resturant API",
      error,
    });
  }
};
module.exports = {
  createResturantController,
  getAllResturants,
  getResturantByIdController,
  deleteResturantController,
};
