const jwt = require("jsonwebtoken");
const { JWT_SECRET } = require("../utils/config");
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
  } catch (e) {
    const err = new Error("Authorization required");
    err.statusCode = 401;

    next(err);
  }
  req.user = payload;
  return next();
};

module.exports = { auth };
