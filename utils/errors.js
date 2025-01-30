const { BAD_REQUEST, NOT_FOUND, DEFAULT } = require("./constants");

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
  return res
    .status(DEFAULT)
    .send({ message: "An error has occured on the server" });
}

module.exports = { handleError };
