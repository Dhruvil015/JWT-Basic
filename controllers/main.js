const catchAsync = require("../utils/catchAsync");
const ApiError = require("../utils/ApiError");
const httpStatus = require("http-status");
const jwt = require("jsonwebtoken");

const login = catchAsync(async (req, res, next) => {
  const { username, password } = req.body;
  if (!username || !password) {
    throw new ApiError(
      httpStatus.BAD_REQUEST,
      "please provide email and password."
    );
  }
  const id = new Date().getDate();
  const token = jwt.sign({ id, username }, process.env.JWT_SECRET, {expiresIn : `${process.env.JWT_REFRESH_EXPIRATION_DAYS}d`});
  res.status(httpStatus.CREATED).json({msg : "user created.", token})
});

const dashboard = catchAsync(async (req, res, next) => {
    const luckyNumber = Math.floor(Math.random() * 100);
    res.status(200).json({
      msg: `hello, ${req.user.username}`,
      secret: `Here is your authorized data, your lucky number is ${luckyNumber}`,
    });

});

module.exports = {
  login,
  dashboard,
};
