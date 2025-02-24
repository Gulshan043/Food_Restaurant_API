const categoryModel = require("../models/categoryModel");

// --------------- create category -----------------
const createCategoryController = async (req, res) => {
  try {
    const { title, imgUrl } = req.body;

    //validation
    if (!title) {
      return res.status(404).send({
        success: false,
        message: "Please Provide Category, title or image",
      });
    }

    const newCategory = new categoryModel({ title, imgUrl });
    await newCategory.save();
    res.status(201).send({
      success: true,
      message: "Category Created",
      newCategory,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: true,
      message: "Error in category API",
    });
  }
};

// ------------------------- get all category ------------
const getAllCategoryController = async (req, res) => {
  try {
    const categories = await categoryModel.find({});
    if (!categories) {
      return res.status(404).send({
        success: false,
        message: "No Categories found",
      });
    }

    res.status(200).send({
      success: true,
      totalCategories: categories.length,
      categories,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error In Get All Category API",
      error,
    });
  }
};

// ----------------- update category ------------------------------
const updateCategoryController = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, imgUrl } = req.body;

    const updatedCategory = await categoryModel.findByIdAndUpdate(
      id,
      { title, imgUrl },
      { new: true }
    );
    if (!updatedCategory) {
      return res.status(500).send({
        success: false,
        message: "no category found",
      });
    }
    res.status(200).send({
      success: true,
      message: "Category Updated Successfully",
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error in update Category API",
      error,
    });
  }
};

// -------------------------------- delete category ---------------------------

const deleteCategoryController = async (req, res) => {
  try {
    const { id } = req.params;
    if (!id) {
      return res.status(404).send({
        success: false,
        message: "Please Provide valid category id",
      });
    }
    const category = await categoryModel.findById(id);
    if (!category) {
      return res.status(500).send({
        success: false,
        message: "No category found with this id",
      });
    }

    await categoryModel.findByIdAndDelete(id);
    res.status(200).send({
      success: true,
      message: "Category Deleted",
    });
    
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error in delete category API",
      error,
    });
  }
};
module.exports = {
  createCategoryController,
  getAllCategoryController,
  updateCategoryController,
  deleteCategoryController,
};
