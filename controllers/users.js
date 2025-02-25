const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/user");
const { handleError } = require("../utils/errors");
const { JWT_SECRET } = require("../utils/config");
const { CONFLICT_ERROR, BAD_REQUEST } = require("../utils/constants");
const BadRequestError = require("../errors/bad-request-error");

const createUser = (req, res, next) => {
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
              handleError(err, res, next);
            });
        });
      }
    })
    .catch((err) => {
      handleError(err, res, next);
    });
};

const getCurrentUser = (req, res, next) => {
  const { _id } = req.user;
  User.findById(_id)
    .orFail()
    .then((user) => {
      res.send(user);
    })
    .catch((err) => {
      handleError(err, res, next);
    });
};

const updateUser = (req, res, next) => {
  const { _id } = req.user;
  const { newName, newAvatar } = req.body;

  User.findByIdAndUpdate(
    _id,
    { name: newName, avatar: newAvatar },
    { new: true, runValidators: true }
  )
    .then((user) => {
      res.send(user);
    })
    .catch((err) => {
      handleError(err, res, next);
    });
};

const login = (req, res, next) => {
  const { email, password } = req.body;
  return User.findUserByCredentials(email, password)
    .then((user) => {
      const token = jwt.sign({ _id: user._id }, JWT_SECRET, {
        expiresIn: "7d",
      });
      res.send({ token });
    })
    .catch((err) => {
      handleError(err, res, next);
    });
};

module.exports = { createUser, getCurrentUser, updateUser, login };
