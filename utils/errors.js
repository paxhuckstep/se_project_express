const {
  BAD_REQUEST,
  NOT_FOUND,
  DEFAULT,
  CONFLICT_ERROR,
  UNAUTHORIZED,
} = require("./constants");

function handleError(err, res) {
  console.log(err);
  if (err.name === "DocumentNotFoundError") {
    return res.status(NOT_FOUND).send({ message: err.message });
  }
  if (err.name === "ValidationError") {
    return res.status(BAD_REQUEST).send({ message: err.message });
  }
  if (err.name === "CastError") {
    return res.status(BAD_REQUEST).send({ message: "Invalid Data" });
  }
  if (err.name === "MongooseError") {
    return res.status(CONFLICT_ERROR).send({ message: "E-mail unavailable" });
  }
  if (err.message === "Incorrect email or password") {
    return res
      .status(UNAUTHORIZED)
      .send({ message: "Incorrect email or password" });
  }
  if (err.message === "Illegal arguments: string, undefined") {
    return res.status(BAD_REQUEST).send({message: err.message});
  }
  return res
    .status(DEFAULT)
    .send({ message: "An error has occured on the server" });
}

module.exports = { handleError };
