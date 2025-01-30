const { JWT_SECRET } = require("../utils/config");
const { UNAUTHORIZED } = require("../utils/constants");

const auth = (req, res) => {
  const { authorization } = req.header;

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
