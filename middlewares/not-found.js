const httpStatus = require("http-status");

const notFound = (req, res) =>
  res.status(httpStatus.NOT_FOUND).send("route does not exist!");

module.exports = notFound;
