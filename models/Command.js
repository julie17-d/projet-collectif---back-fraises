const mongoose = require("mongoose"); // on fait appel au module mongoose qui est un module Node

// Utilisation de la méthode Schema de mongoose pour créer un schéma de données
const commandSchema = mongoose.Schema({
  userId: {type: String, required: true},
  totalPrice: {type: Number, required: false},
  purchaseDate: {type: Date, required: true},
  furnituresDetails:[
    {
      id: {type: String, required: false},
      title: {type: String, required: false},
      price: {type: Number, required: false},
      pictureUrl: {type: String, required: false}
  }],
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
