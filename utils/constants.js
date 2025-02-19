const BAD_REQUEST = 400;
const NOT_FOUND = 404;
const DEFAULT = 500;
const UNAUTHORIZED = 401;
const CONFLICT_ERROR = 409;
const FORBIDDEN = 403;

module.exports = {
  BAD_REQUEST,
  NOT_FOUND,
  DEFAULT,
  UNAUTHORIZED,
  CONFLICT_ERROR,
  FORBIDDEN,
};

//////////New names from part 15,

const BadRequestError = 400;
const UnauthorizedError = 401;
const ForbiddenError = 403;
const NotFoundError = 404;
const ConflictError = 409;