const ApiError = require("../utils/ApiError");
const httpStatus = require("http-status");

const errorConverter = async (err, req, res, next) => {
  let error = err;
  if (!(error instanceof ApiError)) {
    const statusCode = error.statusCode || httpStatus.INTERNAL_SERVER_ERROR;
    const message = error.message || httpStatus[statusCode];
    error = new ApiError(statusCode, message, false, err.stack);
  }
  next(error);
};

const errorHandler = async (err, req, res, next) => {
  let { statusCode, message } = err;

  res.status(statusCode).send(message);
};

module.exports = {
  errorConverter,
  errorHandler,
};
