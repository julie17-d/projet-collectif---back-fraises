const mongoose = require("mongoose");

const furnitureSchema = mongoose.Schema({
  id: {type: Number, required: true},
  title: {type: String, required: true},
  type: {type: String, required: true},
  description: {type: String, required: true},
  dimensions: {type: Object, required: true},
  colors: {type: String, required: true},
  materials: {
    type: String,
    required: true,
    enum: {
      values: [
        "wood",
        "metal",
        "marble",
        "glass",
        "ceramic",
        "plastic",
        "leather",
        "stone",
        "other",
      ],
      message: "error",
    },
  },
  pictureUrl: {type: String, required: true},
  price: {type: Number, required: true},
  status: {
    onSale: {type: Boolean, required: true},
    pending: {type: Boolean, required: true},
    sold: {type: Boolean, required: true},
  },
  seller: {type: String, required: true},
  date: {type: Date, required: true},
});

module.exports = mongoose.model("Furniture", furnitureSchema);
