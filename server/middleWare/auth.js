const jwt = require("jsonwebtoken");

module.exports = function(req, res, next) {
  //get token from client
  const token = req.body.token;

  //Check if not token
  if (!token) {
    return res.status(401).json({ msg: "No token, authorization denied" });
  }

  //decode token and return it as req.user
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
    req.user = decoded.user;
    next();
  } catch (err) {
    res.status(401).json({ msg: "Token is not valid" });
  }
};
