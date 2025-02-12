const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/user");
const { handleError } = require("../utils/errors");
const { JWT_SECRET } = require("../utils/config");
const { CONFLICT_ERROR, BAD_REQUEST } = require("../utils/constants");

const createUser = (req, res) => {
  const { name, avatar, email, password } = req.body;
  User.findOne({ email })
    .then((existingUser) => {
      if (existingUser) {
        res.status(CONFLICT_ERROR).send({ message: "E-mail unavailable" });
      } else {
        bcrypt.hash(password, 8).then((hashedPassword) => {
          User.create({ name, avatar, email, password: hashedPassword })
            .then((user) => {
              res.send({
                _id: user._id,
                name: user.name,
                avatar: user.avatar,
                email: user.email,
              });
            })
            .catch((err) => {
              handleError(err, res);
            });
        });
      }
    })
    .catch((err) => {
      handleError(err, res);
    });
};

const getCurrentUser = (req, res) => {
  const { _id } = req.user;
  User.findById(_id)
    .orFail()
    .then((user) => {
      res.send(user);
    })
    .catch((err) => {
      handleError(err, res);
    });
};

const updateUser = (req, res) => {
  const { _id } = req.user;
  const { newName, newAvatar } = req.body;
  console.log(req.body);

  User.findByIdAndUpdate(
    _id,
    { name: newName, avatar: newAvatar },
    { new: true, runValidators: true }
  )
    .then((user) => {
      console.log("heres the user being sent", user);
      res.send(user);
    })
    .catch((err) => {
      handleError(err, res);
    });
};

const login = (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res
      .status(BAD_REQUEST)
      .send({ message: "Missing e-mail or password" });
  }
  return User.findUserByCredentials(email, password)
    .then((user) => {
      const token = jwt.sign({ _id: user._id }, JWT_SECRET, {
        expiresIn: "7d",
      });
      res.send({ token });
    })
    .catch((err) => {
      handleError(err, res);
    });
};

module.exports = { createUser, getCurrentUser, updateUser, login };
