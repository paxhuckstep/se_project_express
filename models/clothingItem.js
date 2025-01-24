const mongoose = require("mongoose");
const validator = require("validator");

const clothingItem = new mongoose.Schema({
  name: { type: String, required: true, minlength: 2, maxlength: 30 },
  weather: { type: String, required: true, enum: ["hot", "warm", "cold"] },
  imageURL: {
    type: String,
    required: [true, "The avatar field is required."],
    validate: {
      validator(value) {
        return validator.isURL(value);
      },
      message: "You must enter valid URL",
    }
  },
  isLiked: {boolean} // is boolean acceptable ??? or "enum: [true, false]"" or other...
});

module.exports = mongoose.model("item", clothingItem);
