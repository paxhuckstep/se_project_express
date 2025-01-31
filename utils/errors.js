const { BAD_REQUEST, NOT_FOUND, DEFAULT, CONFLICT_ERROR } = require("./constants");

function handleError(err, res) {
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
    return res.status(CONFLICT_ERROR).send({message: "E-mail unavailable"})
  }
  return res
    .status(DEFAULT)
    .send({ message: "An error has occured on the server" });
}

module.exports = { handleError };
