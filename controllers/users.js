const User = require("../models/user");
const { handleError } = require("../utils/errors");
const bcrypt = require("bcryptjs");

const getUsers = (req, res) => {
  User.find({})
    .then((users) => {
      res.send(users);
    })
    .catch((err) => {
      handleError(err, res);
    });
};

const createUser = (req, res) => {
  const { name, avatar, email, password } = req.body;
  bcrypt
    .hash(password, 8)
    .then((hashedPassword) => {
      User.create({ name, avatar, email, password: hashedPassword }); //password isn't getting sent to database
    })
    .then((user) => {
      res.status(201).send(user);
    })
    .catch((err) => {
      console.log(err);
      handleError(err, res);
    });
};

const getUser = (req, res) => {
  const { userId } = req.params;
  User.findById(userId)
    .orFail()
    .then((user) => {
      res.send(user);
    })
    .catch((err) => {
      handleError(err, res);
    });
};

const login = (req, res) => {
  const { email, password } = req.body;

  return User.findUserByCredentials(email, password)
    .then((user) => {
      const token = jwt.sign({ _id: user._id }, JWT_SECRET, {
        expiresIn: "7d",
      });
      res.send(token);
    })
    .catch((err) => {
      handleError(err);
      res.status(401).send({ message: err.message });
    });
};

// const { JWT_SECRET } = require("../utils/config");
// //ya what
// const token = jwt.sign({ _id: user._id }, JWT_SECRET, {
//   expiresIn: "7d",
// });
// console.log(token);

module.exports = { getUsers, createUser, getUser, login };
