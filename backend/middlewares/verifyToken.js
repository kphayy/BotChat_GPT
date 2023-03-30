const jwt = require("jsonwebtoken");

const verifyToken = (req, res, next) => {
  const token = req.headers.authorization;

  if (!token) {
    return res.status(401).json("You're not authenticated");
  }

  const accessToken = token?.split(" ")[1];

  jwt.verify(accessToken, process.env.JWT_ACCESS_TOKEN, (err, userInfo) => {
    if (err) {
      return res.status(403).json("Token is not valid!");
    }
    req.user = userInfo;
    next();
  });
};

module.exports = {verifyToken};
