const {
  BAD_REQUEST,
  NOT_FOUND,
  DEFAULT,
  CONFLICT_ERROR,
  UNAUTHORIZED,
} = require("./constants");
const NotFoundError = require("../errors/not-found-error");
const BadRequestError = require("../errors/bad-request-error");
const ConflictError = require("../errors/conflict-error");
const UnauthorizedError = require("../errors/unauthorized-error");

function handleError(err, res, next) {
  if (err.name === "DocumentNotFoundError") {
    return next(new NotFoundError(err.message))
    // return res.status(NOT_FOUND).send({ message: err.message });
  }
  if (err.name === "ValidationError") {
    return next(new BadRequestError(err.message));
    // return res.status(BAD_REQUEST).send({ message: err.message });
  }
  if (err.name === "CastError") {
    return next(new BadRequestError("InvalidData"));
    // return res.status(BAD_REQUEST).send({ message: "Invalid Data" });
  }
  if (err.name === "MongooseError") {
    return next(new ConflictError("E-mail unavailable"));
    // return res.status(CONFLICT_ERROR).send({ message: "E-mail unavailable" });
  }
  if (err.message === "Incorrect email or password") {
   return next(new UnauthorizedError("Incorrect email or password"));
    // return res
    //   .status(UNAUTHORIZED)
    //   .send({ message: "Incorrect email or password" });
  }
  if (err.message === "Illegal arguments: string, undefined") {
    return next(new BadRequestError(err.message));
    // return res.status(BAD_REQUEST).send({ message: err.message });
  }
  return res
    .status(DEFAULT)
    .send({ message: "An error has occured on the server" });
}

module.exports = { handleError };
