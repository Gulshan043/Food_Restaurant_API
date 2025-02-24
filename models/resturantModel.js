const mongoose = require("mongoose");

const resturantSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "Resturant title is required"],
    },
    imgUrl: {
      type: String,
    },
    foods: {
      type: Array,
    },
    time: { type: String },
    pickup: {
      type: Boolean,
      defult: true,
    },
    delivery: {
      type: Boolean,
      defult: true,
    },
    isOpen: {
      type: Boolean,
      defult: true,
    },
    logoUrl: {
      type: String,
    },
    rating: {
      type: Number,
      defualt: 1,
      min: 1,
      max: 5,
    },
    ratingCount: {
      type: String,
    },
    code: {
      type: String,
    },
    coords: {
      id: { type: String },
      latitude: { type: Number },
      latitudeDelta: { type: Number },
      longitutde: { type: Number },
      longitudeDelta: { type: Number },
      address: { type: String },
      title: { type: String },
    },
  },
  { timestamps: true }
);

// export

module.exports = mongoose.model("Resturant", resturantSchema);
