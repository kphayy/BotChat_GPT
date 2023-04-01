const jwt = require("jsonwebtoken");

const verifyToken = async (req, res, next) => {
  const token = req.headers.authorization;
  console.log("Middleware");
  if (!token) {
    return res.status(401).json("You're not authenticated");
  }

  const accessToken = token?.split(" ")[1];

  await jwt.verify(accessToken, process.env.JWT_ACCESS_TOKEN, (err, userInfo) => {
    if (err) {
      return res.status(403).json("Token is not valid!");
    }
    req.user = userInfo;
    next();
  });
};

module.exports = {verifyToken};
