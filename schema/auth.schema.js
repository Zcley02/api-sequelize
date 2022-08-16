const Joi = require("joi");

const firstName = Joi.string();
const lastName = Joi.string();
const email = Joi.string().email();
const password = Joi.string().min(8);
const token = Joi.string();

const signUpSchema = Joi.object({
    firstName: firstName.required(),
    lastName: lastName.required(),
    email: email.required(),
    password: password.required()
});

const recoverySchema = Joi.object({
    email: email.required()
});

const changePasswordSchema = Joi.object({
    newPassword: password.required(),
    token: token.required()
})

module.exports = {
    signUpSchema,
    recoverySchema,
    changePasswordSchema
}
