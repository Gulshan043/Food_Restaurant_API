const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema({
  foods: [{ type: mongoose.Schema.Types.ObjectId, ref: "Foods" }],
  payments: {},
  buyer: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  status: {
    type: String,
    enum: ["preparing", "prepared", "on the way", "delivered"],
    default: "preparing",
  },
});

// export

module.exports = mongoose.model("Orders", orderSchema);
