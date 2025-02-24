const mongoose = require("mongoose");

const categorySchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "Category is resquired"],
    },
    imgUrl: {
      type: String,
      default:
        "https://similarpng.com/_next/image?url=https%3A%2F%2Fimage.similarpng.com%2Ffile%2Fsimilarpng%2Fvery-thumbnail%2F2021%2F09%2FGood-food-logo-design-on-transparent-background-PNG.png&w=3840&q=75",
    },
  },
  { timestamps: true }
);

// export

module.exports = mongoose.model("Category", categorySchema);
