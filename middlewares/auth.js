
const { JWT_SECRET } = require("../utils/config");

const token = authorization.replace("Bearer ", "");

const authorize (req, res) => {

}

payload = jwt.verify(token, JWT_SECRET);
//
req.user = payload;
next();