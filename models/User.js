const mongoose = require("mongoose");
const userSchema = mongoose.Schema({
  firstName: {type: String, required: true},
  lastName: {type: String, required: true},
  email: {type: String, required: true},
  password: {type: String, required: true},
  phoneNumber: {type: Number, required: true},
  address: {type: String, required: true},
  subscriptionDate: {type: Date, required: true},
  commands: [
    {id: {type: Number, required: true}, price: {type: Number, required: true}},
  ],
  status: {
    type: String,
    required: true,
    enum: {
      values: ["admin", "client"],
      message: "wrong type",
    },
  },
});

module.exports = mongoose.model("User", userSchema);
