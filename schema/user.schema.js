const Joi = require("joi");

const id = Joi.number().integer();
const firstName = Joi.string();
const lastName = Joi.string();
const email = Joi.string().email();
const password = Joi.string().min(8);


const findUserSchema = Joi.object({
  id: id.required(),
});

const updateUserSchema = Joi.object({
  firstName: firstName,
  lastName: lastName,
  email: email,
  password: password,
});

module.exports = {
  findUserSchema,
  updateUserSchema,
};
