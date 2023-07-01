const jwt = require("jsonwebtoken");

exports.authenticate = (req, res, next) => {
  const accessToken = req.header("x-access-token");

  jwt.verify(accessToken, process.env.JWT_KEY, (error, decoded) => {
    if (error) {
      res.status(401).send({ error });
    } else {
      req.userId = decoded._id;
      next();
    }
  });
};
