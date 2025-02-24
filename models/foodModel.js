const mongoose = require("mongoose");

const foodScema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, "Food title is required"],
  },
  description: {
    type: String,
    required: [true, "Food description are required"],
  },
  price: {
    type: Number,
    required: [true, "Food price are required"],
  },
  imgUrl: {
    type: String,
    default:"https://similarpng.com/_next/image?url=https%3A%2F%2Fimage.similarpng.com%2Ffile%2Fsimilarpng%2Fvery-thumbnail%2F2021%2F09%2FGood-food-logo-design-on-transparent-background-PNG.png&w=3840&q=75"
  },
  foodTags: {
    type: String,
  },
  category: {
    type: String,
  },
  code: {
    type: String,
  },
  isAvailable: {
    type: Boolean,
    defualt: true,
  },
  resturant: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Resturant",
  },
  rating: {
    type: Number,
    default: 5,
    min: 1,
    max: 5,
  },
  reatingCount: {
    type: String,
  },
});

// export

module.exports = mongoose.model("Foods", foodScema);
