const jwt = require("jsonwebtoken");

const { JWT_SECRET } = require("./config");

const createJWT = (id) => {
  const token = jwt.sign({ _id: id }, JWT_SECRET, {
    expiresIn: "7d",
  });

  return token;
};

module.exports = {
  createJWT,
};
