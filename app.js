const express = require("express");
const mongoose = require("mongoose");
const mainRouter = require("./routes/index");

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


// DELETED BECAUSE WE HAVE AUTHORIZATION NOW
// app.use((req, res, next) => {
//   req.user = {
//     _id: "6793f3464c26502dd5fa807b",
//   };
//   next();
// });

app.use("/", mainRouter);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
