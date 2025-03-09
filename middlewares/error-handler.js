const errorHandler = (error, req, res, next) => {
  const statusCode = error.statusCode || 500;
  const message =
    statusCode === 500 ? "An error has occured on the server" : error.message;
  res.status(statusCode).send({ message });
  next();
};

module.exports = { errorHandler };
