const mongoose = require("mongoose"); // on fait appel au module mongoose qui est un module Node

// Utilisation de la méthode Schema de mongoose pour créer un schéma de données
const commandSchema = mongoose.Schema({
  userId: {type: Number, required: true},
  price: {type: Number, required: true},
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
