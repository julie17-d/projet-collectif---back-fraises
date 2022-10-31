const http = require('http'); //on recupere le module http
const app = require('./app'); // on recupere ce qu'on a dans notre fichier app.js
const port = 3000; //on definie le port où on ecoute le serveur
//app.set('port', port); //?
const server = http.createServer(app); // avec le module http on appelle la methode createserver et avec en paramètre l'appli
server.on('listening', ()=> {  //quand on a le serveur qui est lancé, on console.log le port où on l'ecoute
    console.log('listening on ' + port)
});
server.listen(port); // on lance le serveur et l'ecoute 

