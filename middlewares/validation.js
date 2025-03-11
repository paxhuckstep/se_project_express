const { Joi, celebrate } = require("celebrate");
const validator = require("validator");

const validateUrl = (value, helpers) => {
  if (validator.isURL(value)) {
    return value;
  }
  return helpers.error("string.uri");
};

const validateCardBody = celebrate({
  body: Joi.object().keys({
    name: Joi.string().required().min(2).max(30).messages({
      "string.min": 'The minimum length of the "name" field is 2',
      "string.max": 'The maximum length of the "name" field is 30',
      "string.empty": 'The "name" field must be filled in',
    }),

    imageUrl: Joi.string().required().custom(validateUrl).messages({
      "string.empty": 'The "imageUrl" field must be filled in',
      "string.uri": 'the "imageUrl" field must be a valid url',
    }),
    weather: Joi.string().required().valid("hot", "cold", "warm").messages({
      "string.empty": "the weather field is required",
      "string.valid": "",
    }),
  }),
});

const validateItemId = celebrate({
  params: Joi.object().keys({
    itemId: Joi.string().alphanum().length(24).messages({
      "string.length": "the ID must be 24 characters long",
      "string.alphanum":
        "the id must be just letters and numbers, no special characters",
      "string.empty": "An item ID was not sent",
    }),
  }),
});

const validateLoginAttempt = celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email().messages({
      "string.empty": "the email field is required",
      "string.email": "A valid email must be submitted",
    }),
    password: Joi.string().required().min(8).messages({
      "string.empty": "password is required",
      "string.min": "password must be at least 8 characters long",
    }),
  }),
});

const validateNewUserData = celebrate({
  body: Joi.object().keys({
    name: Joi.string().required().min(2).max(30).messages({
      "string.min": "name must be at least 2 characters long",
      "string.max": "name can't be longer than 30 characters",
      "string.empty": "name field is requried",
    }),
    avatar: Joi.string().required().custom(validateUrl).messages({
      "string.empty": "The imageUrl field must be filled in",
      "string.uri": "the imageUrl field must be a valid url",
    }),
    email: Joi.string().required().email().messages({
      "string.empty": "the email field is required",
      "string.email": "A valid email must be submitted",
    }),
    password: Joi.string().required().min(8).messages({
      "string.empty": "password is required",
      "string.min": "password must be at least 8 characters long",
    }),
  }),
});

const validateUpdateUserData = celebrate({
  body: Joi.object().keys({
    name: Joi.string().required().min(2).max(30).messages({
      "string.min": "name must be at least 2 characters long",
      "string.max": "name can't be longer than 30 characters",
      "string.empty": "name field is requried",
    }),
    avatar: Joi.string().required().custom(validateUrl).messages({
      "string.empty": "The imageUrl field must be filled in",
      "string.uri": "the imageUrl field must be a valid url",
    }),
  }),
});


module.exports = {
  validateCardBody,
  validateItemId,
  validateLoginAttempt,
  validateNewUserData,
  validateUpdateUserData,
};

// make another one for users
