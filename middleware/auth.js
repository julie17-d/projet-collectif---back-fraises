// Tuto OpenClassRoom suivi pour l'implémentation du middleware => https://openclassrooms.com/fr/courses/6390246-passez-au-full-stack-avec-node-js-express-et-mongodb/6466605-configurez-le-middleware-dauthentification
// on ajoute le module jsonwebtoken pour créer des token et les vérifier
const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
  try {
    // on récupère le token à partir des headers de la requête
    const token = req.headers.authorization.split(" ")[1];
    console.log(token);
      //"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2MzY1MjcyMTEyN2Q4NzViY2QwYWIwN2UiLCJpYXQiOjE2Njc1NzM5NzYsImV4cCI6MTY2NzY2MDM3Nn0.SgVfVoG-O7CLRVdFYdkr5iv8EleOeMb1J4RaE_k1e-I"
        // tester req.headers.authorization.split(" ")[1] quand info du front reçue. Il faut récupérer un token du même style que celui en dur. Il doit être dans les headers de la requête, dans authorization.
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
  next();
};
