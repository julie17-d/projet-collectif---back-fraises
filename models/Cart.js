const mongoose = require("mongoose");

const cartSchema = mongoose.Schema({
  userId: {type: Number, required: true},
  totalPrice: {type: Number, required: true},
  purchaseDate: {type: Date, required: true},
  furnituresDetails: [
    {
      id: {type: Number, required: true},
      title: {type: String, required: true},
      price: {type: Number, required: true},
      pictureUrl: {type: String, required: true},
    },
  ],
  shippingAddress: {type: String, required: true},
});

module.exports = mongoose.model("Cart", cartSchema);
