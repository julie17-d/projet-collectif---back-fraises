const express = require("express"); // on importe le module node express
const app = express(); // on appelle la methode express

const mongoose = require("mongoose"); // on fait appel au module mongoose qui est un module Node

mongoose
  .connect(
    "mongodb+srv://fraises:back@cluster0.iutroww.mongodb.net/?retryWrites=true&w=majority",
    {useNewUrlParser: true, useUnifiedTopology: true}
  ) // Methode "connect()" de mongoose qui permet de se connecter à la BDD mongoDB atlas (cloud)
  .then(() => console.log("Connexion à MongoDB réussie !"))
  .catch(() => console.log("Connexion à MongoDB échouée !"));
// on console.log la réussite ou non de la connexion (.then ou .catch)

const Furniture = require("./models/Furniture");

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content, Accept, Content-Type, Authorization"
  );
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PUT, DELETE, PATCH, OPTIONS"
  );
  next();
});

app.post("/api/furnitures", (req, res, next) => {
  // res.send("Hello Juanita!");
  // on a créé un middleware qui repond à la requete POST
  // delete req.body._id;
  const furniture = new Furniture({
    title: "Table Delhia",
    type: "table",
    description:
      "Fiable et élégante, cette table ne vous laissera jamais tomber. Grâce à elle, fancyness is your way.",
    dimensions_cm: {
      height: 70,
      width: 140,
      depth: 20,
    },
    colors: "rose",
    materials: "marble",
    pictureUrl:
      "https://cdn.shopify.com/s/files/1/0627/1244/7234/products/IMG_0972_1445x.jpg",
    price: 3000,
    status: {
      onSale: true,
      pending: false,
      sold: false,
    },
    seller: "Lauréline Fleury",
    date: "1667468404734",
  });
  furniture
    .save()
    .then(() => res.status(201).json({message: "meuble enregistré"}))
    .catch(() => res.status(400).json({error}));
  next();
});

app.get("/api/furnitures", (req, res) => {
  // on a créé un middleware qui repond à la requete GET
  // res.send("Hello DEDE!");
  Furniture.find()
    .then((furnitures) => res.status(200).json(furnitures))
    .catch((error) => res.status(400).json({error}));
});

module.exports = app; // on exporte le module app qu'on récupère dans le serveur
