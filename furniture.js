const mongoose = require("mongoose");

const furnitureSchema = mongoose.Schema({
  id: {type: Number, required: true},
  name: {type: String, required: true},
  type: {type: String, required: true},
  color: {type: String, required: true},
  status: {type: String, required: true},
  material: {type: String, required: true},
  description: {type: String, required: true},
  imageUrl: {type: String, required: true},
  price: {type: Number, required: true},
});

module.exports = mongoose.model("Furniture", furnitureSchema);
