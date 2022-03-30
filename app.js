const express = require("express");
const app = express();
const mongoose = require("mongoose");
const { errorConverter, errorHandler } = require("./middlewares/error");
const notFound = require("./middlewares/not-found");
const connectDB = require("./db/connectDB");
require("dotenv").config();

const mainRouter = require("./routes/main");

app.use(express.static("./public"));
app.use(express.json());

app.use("/api/v1", mainRouter);

app.use(notFound);
app.use(errorConverter);
app.use(errorHandler);

const port = process.env.PORT || 3000;
const start = async () => {
  try {
    app.listen(port, console.log(`server is running on ${port}...`));
  } catch (error) {
    console.log(error);
  }
};

start();
