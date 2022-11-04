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

//On ajoute le model Furniture
const Furniture = require("./models/Furniture");

//Permettre d'accéder à l'API depuis n'importe quelle origine et d'ajouter des headers aux requêtes envoyées à l'API
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

app.get("/api/furnitures", (req, res) => {
  // voici un middleware qui repond a la requete GET
  let query = req.query;
  //on récupère la requête du front (idéalement un objet en JSON qui reprend l'attribut et la valeur du filtre)
  let queryKey = Object.keys(query);
  //on récupère l'attribut
  let queryValue = Object.values(query);
  //on récupère la valeur
  queryKey = queryKey[0];
  queryValue = queryValue[0];
  //on ajoute un filtre à la méthode find() selon l'attribut et la valeur
  Furniture.find({[queryKey]: queryValue})
    .where("status.onSale")
    .equals(true)
    //on affiche que les meubles dont le statut est onSale
    .then((furnitures) => res.status(201).json(furnitures))
    .catch((error) => res.status(400).json({error}));
});

app.post("/api/furnitures", (req, res) => {
  // to delete an entire collection on mongoDB
  // Furniture.collection.deleteMany();
  // on a créer un middleware qui repond a la requete POST
  const furniture = new Furniture({
    title: "Canapé-lit Clémentine",
    type: "assise",
    description:
      "Que vous ayez une envie de vous assoupir ou de savourer une tasse de thé, le canapé-lit Clémentine sera toujours là pour combler vos besoins.",
    dimensions_cm: {
      height: 80,
      width: 240,
      depth: 80,
    },
    materials: ["textile"],
    colors: "jaune",
    pictureUrl:
      "https://assets.loaf.com/images/hero_large/4833611-squisharoo.jpg",
    price: 950,
    status: {
      onSale: true,
      pending: false,
      sold: false,
    },
    seller: "Lauréline Fleury",
    date: Date.now(),
  });
  furniture
    .save()
    .then(() => res.status(201).json({message: "Objet enregistré !"}))
    .catch((error) => res.status(400).json({error}));
});

// on ajoute le module bcrypt pour crypter les mots de passe des users
const bcrypt = require("bcrypt");
// on ajoute le model User
const users = require("./models/User");

// on crée un endpoint pour l'authentification signup et login
app.post("/api/auth/signup", (req, res) => {
  bcrypt
    .hash("test", 10)
    .then((hash) => {
      const user = new User({
        // email: req.body.email,
        // password: hash,
        firstName: "Test",
        lastName: "Test",
        email: "test@gmail.com",
        password: hash,
        phoneNumber: 607080910,
        address: "Montreuil",
        subscriptionDate: Date.now(),
        commands: [],
        status: "client",
      });
      user
        .save()
        .then(() => res.status(201).json({message: "utilisateur créé"}))
        .catch((error) => res.status(400).json({error}));
    })
    .catch((error) => res.status(500).json({error}));
});
app.post("/api/auth/login", (req, res) => {});
module.exports = app; // on exporte le module app qu'on récupère dans le serveur
