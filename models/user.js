const mongoose = require("mongoose");
const validator = require("validator");

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 30,
  },
  avatar: {
    type: String,
    required: [true, "The avatar field is required."],
    validate: {
      validator(value) {
        return validator.isURL(value);
      },
      message: "You must enter a valid URL",
    },
  },
  email: {
    type: String,
    required: [true, "E-mail is required"],
    unique: [true, "that e-mail is unavailable, please try another"], //I can send dublicate email addresses :/
    validate: {
      validator(value) {
        return validator.isEmail(value);
      },
      message: "You must enter a valid e-mail address",
    },
    password: {
      type: String,
      required: [true, "password is required"],
      select: false,
    }
  },
});


// How is this supposed to go
userSchema.statics.findUserByCredentials = function findUserByCredentials (email, password) {
  return this.findOne({ email })
    .then((user) => {
      if (!user) {
        return Promise.reject(new Error('Incorrect email or password'));
      }

      return bcrypt.compare(password, user.password)
        .then((matched) => {
          if (!matched) {
            return Promise.reject(new Error('Incorrect email or password'));
          }

          return user; // now user is available
        });
    });
};


module.exports = mongoose.model("User", userSchema);
