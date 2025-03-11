// 
const NotFoundError = require("../errors/not-found-error");
const BadRequestError = require("../errors/bad-request-error");
const ConflictError = require("../errors/conflict-error");
const UnauthorizedError = require("../errors/unauthorized-error");

function handleError(err, res, next) {
  console.log(err);
  if (err.name === "DocumentNotFoundError") {
    return next(new NotFoundError(err.message));
  }
  if (err.name === "ValidationError") {
    return next(new BadRequestError(err.message));
  }
  if (err.name === "CastError") {
    return next(new BadRequestError("InvalidData"));
  }
  if (err.name === "MongooseError") {
    return next(new ConflictError("E-mail unavailable"));
  }
  if (err.message === "Incorrect email or password") {
    return next(new UnauthorizedError("Incorrect email or password"));
  }
  if (err.message === "Illegal arguments: string, undefined") {
    return next(new BadRequestError(err.message));
  }
  return next(new Error(err.message));
}

module.exports = { handleError };
