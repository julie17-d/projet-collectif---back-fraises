const express = require("express"); // on importe le module node express
const app = express(); // on appelle la methode express
// Tuto OpenClassRoom suivi pour l'implémentation de signup, login et passage de auth => https://openclassrooms.com/fr/courses/6390246-passez-au-full-stack-avec-node-js-express-et-mongodb/6466506-creez-des-utilisateurs et pages suivantes
// on ajoute le module bcrypt pour crypter les mots de passe des users
const bcrypt = require("bcrypt");
// on ajoute le module jsonwebtoken pour créer des token et les vérifier
const jwt = require("jsonwebtoken");
// on ajoute le middleware qui vérifient et décodent les token pour les passer aux requêtes
const auth = require("./middleware/auth");
const bodyParser = require("body-parser");

const mongoose = require("mongoose"); // on fait appel au module mongoose qui est un module Node

mongoose
  .connect(
    "mongodb+srv://fraises:back@cluster0.iutroww.mongodb.net/?retryWrites=true&w=majority",
    { useNewUrlParser: true, useUnifiedTopology: true }
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

// on passe l'objet auth pour transmettre le token à la requête
app.get("/api/furnitures", (req, res) => {
  // voici un middleware qui repond a la requete GET
  let query = req.query;
  // on récupère la requête du front (idéalement un objet en JSON qui reprend l'attribut et la valeur du filtre)
  let queryKey = Object.keys(query);
  // on récupère l'attribut
  let queryValue = Object.values(query);
  // on récupère la valeur
  queryKey = queryKey[0];
  queryValue = queryValue[0];
  // on ajoute un filtre à la méthode find() selon l'attribut et la valeur
  Furniture.find({ [queryKey]: queryValue })
    .where("status.onSale")
    .equals(true)
    // on affiche que les meubles dont le statut est onSale
    .then((furnitures) => res.status(201).json(furnitures))
    .catch((error) => res.status(400).json({ error }));
});

app.get("/api/allFurnitures", (req, res) => {
  Furniture.find()
    .then((furnitures) => res.status(201).json(furnitures))
    .catch((error) => res.status(400).json({ error }));
});

// on passe l'objet auth pour transmettre le token à la requête
app.post("/api/addFurniture", (req, res) => {
  const query = req.body.furniture
  console.log(query);
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
      onSale: false,
      pending: true,
      sold: false,
    },
    seller: query.seller,
    date: Date.now(),
  });
  furniture
    .save()
    .then(() => res.status(201).json({ message: "Objet enregistré !" }))
    .catch((error) => {
      //console.log(error)
      res.status(400).json({ error })
    });
});

app.post("/api/validCart", async (req, res) => {
  // décommenter la ligne ci-dessous pour supprimer toutes les commandes de la database
  // Command.collection.deleteMany();
  const command = await Command.create({
    userId: req.body.userId, // récupérer le userId du headers
    purchaseDate: Date.now(),
    status: "payed",
  });
  let query = req.body;
  let total = 0;
  for (let i = 0; i < query.length; i++) {
    let id = query[i]._id;
    let title = query[i].title;
    let price = query[i].price;
    let pictureUrl = query[i].pictureUrl;
    total += price;
    command.furnituresDetails.push({
      id: id,
      title: title,
      price: price,
      pictureurl: pictureUrl,
    });

  //   Furniture.findOneAndUpdate({_id: id}, {"status.onSale":false}, {upsert: false}, function(err, doc) {
  //     if (err) return res.send(500, {error: err});
  // });
  // console.log(id, title);
  Furniture.findOneAndUpdate(
    { _id: query[i]._id},
    {"status.onSale":true, "status.sold": true})
    // { new: true })
    // (err, order) => {
    // if (err) {
    //     return res.status(400).json({error: "Cannot update order status"});
    // }
    // res.json(order);
    // });
  }

  const updateFurnitures = query.map((record) => {
    const updateFurniture = {
      'updateOne': {
        'filter': {
          _id: record._id,
        },
        'update': {
          $set:
          {
            'status.onSale': false,
            'status.sold': true
          }
        },
      }
    }
    return updateFurniture
  })
  
  await Furniture.bulkWrite(updateFurnitures)
    .then(async () => {
      command.totalPrice = total;
      await command
        .save()
        .then(() => res.status(201).json({ message: "Commande enregistrée !" }))
        .catch((error) => res.status(400).json({ error }));
    })
});

// on importe le model User
const User = require("./models/User");
const { updateOne } = require("./models/Furniture");
  // // on passe l'objet auth pour transmettre le token à la requête
// app.post("/api/addUser", (req, res) => {
//   const query = req.body
//   const user = new User({
//     firstName: query.firstName,
//     lastName: query.lastName,
//     email: query.email,
//     password: query.password,
//     phoneNumber: query.phoneNumber,
//     address: query.address,
//     subscriptionDate: Date.now(),
//     status: "client",
//   });
//   user
//     .save()
//     .then(() => res.status(201).json({message: "Utilisateur enregistré !"}))
//     .catch((error) => res.status(400).json({error}));
// });

// on passe l'objet auth pour transmettre le token à la requête
app.get("/api/users", (req, res) => {
  // on a créer un middleware qui repond a la requete GET
  User.find()
    .then((users) => res.status(201).json(users))
    .catch((error) => res.status(400).json({ error }));
});

// on crée un endpoint pour l'authentification signup
app.post("/api/auth/signup", (req, res) => {
  const query = req.body.user;
  bcrypt
    .hash(query.password, 10) //req.body.password à la place de "Test3" quand info reçue du front/ 10 => nombre
    .then((hash) => {
      const user = new User({
        firstName: query.firstName, // firstName: req.body.firstName
        lastName: query.lastName, // lastName: req.body.lastName
        email: query.email, // email:req.body.email
        password: hash, // reste comme ça
        phoneNumber: query.phoneNumber, // phoneNumber : req.body.phoneNumber
        address: query.address, // address:req.body.address
        subscriptionDate: Date.now(), // reste comme ça
        status: "client", // status : req.body.status
      });
      user
        .save()
        .then(() => res.status(201).json({ message: "utilisateur créé" }))
        .catch((error) => res.status(400).json({ error }));
    })
    .catch((error) => res.status(500).json({ error }));
});

// on crée un endpoint pour l'authentification login
app.post("/api/auth/login", (req, res) => {
  User.findOne({ email: req.body.user.email }) //req.body.email quand info reçue du front
    .then((user) => {
      if (user === null) {
        res
          .status(401) // statut unauthorized
          .json({ message: "Paire identifiants mot de passe incorrecte" });
      } else {
        bcrypt
          .compare(
            req.body.user.password, // req.body.password quand info reçue du front
            user.password
          )
          .then((valid) => {
            if (!valid) {
              res
                .status(401)
                .json({
                  message: "Paire identifiants mot de passe incorrecte",
                });
            } else {
              res.status(200).json({
                firstName: user.firstName,
                userId: user._id,
                token: jwt.sign(
                  { userId: user._id }, // données à encoder à l'interieur du token => on appelle ça le "payload". On encode le userId car si on crée un objet avec un user, on ne doit pas pouvoir le modifier avec un autre user. Le userId encodé sera utilisé pour appliquer le bon userId à chaque objet pourqu'il ne puisse être modifié que par le user qui l'a créé.
                  "RANDOM_TOKEN_SECRET", // clé secrète pour l'encodage => ici, un secret simple est créé car on est en dév et pas en prod.
                  { expiresIn: "24h" } // ici, expiration pour le token de 24h
                ),
              }); // ça donne ça :
              // {
              //    "userId": "63652721127d875bcd0ab07e",
              //    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2MzY1MjcyMTEyN2Q4NzViY2QwYWIwN2UiLCJpYXQiOjE2Njc1NzM5NzYsImV4cCI6MTY2NzY2MDM3Nn0.SgVfVoG-O7CLRVdFYdkr5iv8EleOeMb1J4RaE_k1e-I"
              // }
            }
          })
          // .then((data) => {
          //   window.localStorage.setItem("token", JSON.stringify(token));
          // })
          .catch((error) => {
            res.status(500).json({ error });
          });
      }
    })
    .catch((error) => {
      req.status(500).json({ error });
    });
});

app.put("/api/updatestatus", async (req, res) => {
  const query = req.body;

  const id = query.id;
  let onSale = query.onSale;
  let pending = query.pending;
  let sold = query.sold;

  if (onSale === undefined) { onSale = false };
  if (pending === undefined) { pending = false };
  if (sold === undefined) { sold = false };

  await Furniture.findOneAndUpdate({ _id: id }, { "status.onSale": onSale, "status.pending": pending, "status.sold": sold }, { upsert: false })
    .then((updates) => res.status(201).json("Status updated."))
    .catch((error) => res.status(400).json({ error }));
})

module.exports = app; // on exporte le module app qu'on récupère dans le serveur
