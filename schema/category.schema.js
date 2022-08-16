const Joi = require("joi");

const id = Joi.number().integer();
const name = Joi.string();
const description = Joi.string();

const findCategorySchema = Joi.object({
    id: id.required()
});

const createCategorySchema = Joi.object({
    name: name.required(),
    description: description.required()
});

const updateCategorySchema = Joi.object({
    name: name,
    description: description
});

module.exports = {
    findCategorySchema,
    createCategorySchema,
    updateCategorySchema
}