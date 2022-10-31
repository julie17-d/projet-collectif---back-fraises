const express = require('express'); // on importe le module node express
const app = express(); // on appelle la methode express

app.get('/', (req, res, next) => {  // on a créer un middleware qui repond a la requete GET
    res.send('Hello DEDE!');
    next();
});

app.post('/', (req, res) => {   // on a créer un middleware qui repond a la requete POST
    res.send('Hello Juanita!')
});

module.exports = app; // on exporte le module app qu'on recupere dans le serveur