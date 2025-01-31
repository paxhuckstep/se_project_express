const { JWT_SECRET } = require("../utils/config");
const jwt = require("jsonwebtoken");
const { UNAUTHORIZED } = require("../utils/constants");

const auth = (req, res, next) => {
  const { authorization } = req.headers;
  if (!authorization || !authorization.startsWith("Bearer ")) {
    return res.status(UNAUTHORIZED).send("authorization required");
  }
  const token = authorization.replace("Bearer ", "");
  let payload;

  try {
    payload = jwt.verify(token, JWT_SECRET);
  } catch {
    return res.status(UNAUTHORIZED).send("authorization required");
  }
  req.user = payload;
  next();
};

//

module.exports = { auth };
