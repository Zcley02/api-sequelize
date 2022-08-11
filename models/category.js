"use strict";
const { Model } = require("sequelize");
const CategorySchema = require("./schema/category.schema");

module.exports = (sequelize, DataTypes) => {
  class Category extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      this.hasMany(models.Furniture, {
        as: "furnitures",
        foreignKey: "categoryId",
      });
    }
  }
  Category.init(CategorySchema(DataTypes), {
    sequelize,
    modelName: "Category",
    timestamps: false,
  });
  return Category;
};
