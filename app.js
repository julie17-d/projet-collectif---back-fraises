const express = require("express"); // on importe le module node express
const app = express(); // on appelle la methode express
const mongoose = require("mongoose");
mongoose
  .connect(
    "mongodb+srv://fraises:back@cluster0.iutroww.mongodb.net/?retryWrites=true&w=majority",
    { useNewUrlParser: true, useUnifiedTopology: true }
  )
  .then(() => console.log("Connexion à MongoDB réussie !"))
  .catch(() => console.log("Connexion à MongoDB échouée !"));

app.get("/", (req, res, next) => {
  // on a créer un middleware qui repond a la requete GET
  res.send("Hello DEDE!");
  next();
});

app.post("/", (req, res) => {
  // on a créer un middleware qui repond a la requete POST
  res.send("Hello Juanita!");
});

module.exports = app; // on exporte le module app qu'on recupere dans le serveur
