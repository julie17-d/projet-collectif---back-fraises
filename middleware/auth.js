// on ajoute le module jsonwebtoken pour créer des token et les vérifier
const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
  try {
    // on récupère le token à partir des headers de la requête
    const token =
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2MzY0ZWY1ZGRlYzI2NTU0N2FiNjBkMTgiLCJpYXQiOjE2Njc1Njk0NDUsImV4cCI6MTY2NzY1NTg0NX0.rSx_iLf2APpJNBTCWdMtCtDlU-kntmYHk1hHkDgbnBs"; // tester req.headers.authorization.split(" ")[1] quand info du front reçue. Il faut récupérer un token du même style que celui en dur.
    // on décode le token
    const decodedToken = jwt.verify(token, "RANDOM_TOKEN_SECRET");
    // on récupère l'userId
    const userId = decodedToken.userId;
    // on ajoute l'userId à l'objet request qui est transmis aux routes qui vont être appelées par la suite
    req.auth = {
      userId: userId,
    };
  } catch (error) {
    res.status(401).json({error});
  }
};
