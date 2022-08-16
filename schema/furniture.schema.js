const Joi = require("joi");

const id = Joi.number().integer();
const name = Joi.string();
const description = Joi.string();
const image = Joi.string().uri();
const price = Joi.number();
const categoryId = Joi.number().integer();

const findFurnitureSchema = Joi.object({
    id: id.required()
});

const createFurnitureSchema = Joi.object({
    name: name.required(),
    description: description.required(),
    image: image.required(),
    price: price.required(),
    categoryId: categoryId.required()
});

const updateFurnitureSchema = Joi.object({
    name: name,
    description: description,
    image: image,
    price: price,
    categoryId: categoryId
});

const deleteFurnitureSchema = Joi.object({
    id: id.required()
});

module.exports = {
    findFurnitureSchema,
    createFurnitureSchema,
    updateFurnitureSchema,
    deleteFurnitureSchema
}