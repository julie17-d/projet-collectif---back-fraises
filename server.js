const http = require("http"); //on recupere le module http
const app = require("./app"); // on recupere ce qu'on a dans notre fichier app.js

// Stabilisation du serveur, ne pas se préoccuper de la ligne 4 à 36
const normalizePort = (val) => {
  const port = parseInt(val, 10);
  if (isNaN(port)) {
    return val;
  }
  if (port >= 0) {
    return port;
  }
  return false;
};
const port = normalizePort(process.env.PORT || "3001"); //on definie le port où on ecoute le serveur
app.set("port", port);
const errorHandler = (error) => {
  if (error.syscall !== "listen") {
    throw error;
  }
  const address = server.address();
  const bind =
    typeof address === "string" ? "pipe " + address : "port: " + port;
  switch (error.code) {
    case "EACCES":
      console.error(bind + " requires elevated privileges.");
      process.exit(1);
      break;
    case "EADDRINUSE":
      console.error(bind + " is already in use.");
      process.exit(1);
      break; // on fait appel au module mongoose qui est un module Node
    default:
      throw error;
  }
};

const server = http.createServer(app); // avec le module http on appelle la methode createserver et avec en paramètre l'appli
server.on("error", errorHandler);
server.on("listening", () => {
  const address = server.address();
  const bind = typeof address === "string" ? "pipe " + address : "port " + port;
  console.log("Listening on " + bind); // quand on a le serveur qui est lancé, on console.log le port où on l'ecoute
});
server.listen(port); // on lance le serveur et l'ecoute
