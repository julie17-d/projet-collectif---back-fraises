const mongoose = require("mongoose"); // on fait appel au module mongoose qui est un module Node

// Utilisation de la méthode Schema de mongoose pour créer un schéma de données
const cartSchema = mongoose.Schema({
  userId: {type: Number, required: true},
  date: {type: Date, required: true},
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
