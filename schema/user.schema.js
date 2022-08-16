const Joi = require("joi");

const id = Joi.number().integer();
const firstName = Joi.string();
const lastName = Joi.string();
const email = Joi.string().email();
const password = Joi.string().min(8);
