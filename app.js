const express = require("express"); // on importe le module node express
const app = express(); // on appelle la methode express
const furnitures = require("./models/Furniture");

const mongoose = require("mongoose"); // on fait appel au module mongoose qui est un module Node
const Furniture = require("./models/Furniture");
mongoose
  .connect(
    "mongodb+srv://fraises:back@cluster0.iutroww.mongodb.net/?retryWrites=true&w=majority",
    {useNewUrlParser: true, useUnifiedTopology: true}
  ) // Methode "connect()" de mongoose qui permet de se connecter à la BDD mongoDB atlas (cloud)
  .then(() => console.log("Connexion à MongoDB réussie !"))
  .catch(() => console.log("Connexion à MongoDB échouée !"));
// on console.log la réussite ou non de la connexion (.then ou .catch)

app.get("/furnitures", (req, res, next) => {
  // on a créé un middleware qui repond à la requete GET
  res.send("Hello DEDE!");
  next();
});

app.post("/furnitures", (req, res) => {
  // on a créé un middleware qui repond à la requete POST
  delete req.body._id;
  const furniture = new Furniture({...req.body});
  furniture
    .save()
    .then(() => res.status(201).json({message: "meuble enregistré"}))
    .catch(() => res.status(400).json({error}));

  res.send("Hello Juanita!");
});

module.exports = app; // on exporte le module app qu'on récupère dans le serveur
