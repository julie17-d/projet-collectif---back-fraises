const mongoose = require("mongoose"); // on fait appel au module mongoose qui est un module Node

// Utilisation de la méthode Schema de mongoose pour créer un schéma de données
const userSchema = mongoose.Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true },
  phoneNumber: { type: String, required: true },
  address: { type: String, required: true },
  subscriptionDate: { type: Date, required: true },
  commands: [
    {
      id_command: { type: Number, required: true },
      price: { type: Number, required: true },
    },
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
