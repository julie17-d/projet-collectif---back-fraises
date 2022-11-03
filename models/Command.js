const mongoose = require("mongoose");

const commandSchema = mongoose.Schema({
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
  status: {
    type: String,
    required: true,
    enum: {
      values: ["payed", "pending"],
      message: "wrong type",
    },
  },
});

module.exports = mongoose.model("Command", commandSchema);
