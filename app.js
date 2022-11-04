const express = require("express"); // on importe le module node express
const app = express(); // on appelle la methode express
const bodyParser = require('body-parser')

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

//On ajoute le model Command
const Command = require("./models/Command");

// middleware
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));

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
  Furniture.find({ [queryKey]: queryValue}).where('status.onSale').equals(true)
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

app.post("/api/validCart", async (req, res) => {
  const command = await Command.create({
    userId: "6364ef5ddec265547ab60d18",
    purchaseDate: Date.now(),
    status: "payed"
  });
  let query = req.body;
  let total = 0;
  for (let i = 0; i<query.length; i++){
    let id = query[i]._id;
    let title = query[i].title;
    let price = query[i].price;
    let pictureUrl = query[i].pictureUrl;
    total += price;
    command.furnituresDetails.push({
      id: id,
      title: title,
      price: price,
      pictureurl: pictureUrl
    });
  }
  command.totalPrice = total;
  await command
    .save()
    .then(() => res.status(201).json({message: "Commande enregistrée !"}))
    .catch((error) => res.status(400).json({error}));
  }
);

module.exports = app; // on exporte le module app qu'on récupère dans le serveur
