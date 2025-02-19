const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const helmet = require("helmet");
const mainRouter = require("./routes/index");
const errorHandler = require('./middlewares/error-handler');
const { errors } = require('celebrate');
const { requestLogger, errorLogger } = require('./middlewares/logger');
// const limiter = require("./middlewares/rateLimit");

const app = express();
const { PORT = 3001 } = process.env;

mongoose
  .connect("mongodb://127.0.0.1:27017/wtwr_db")
  .then(() => {
    console.log("Connected to DB");
  })
  .catch((e) => {
    console.error(e);
  });

app.use(express.json());
app.use(cors());
// app.use(limiter);
app.use(helmet())

app.use("/", mainRouter);
app.use(requestLogger);
app.use(routes);
app.use(errors());
app.use(errorHandler);


app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
