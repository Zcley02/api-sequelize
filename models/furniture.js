"use strict";
const { Model } = require("sequelize");
const FurnitureSchema = require("./schema/furniture.schema");

module.exports = (sequelize, DataTypes) => {
  class Furniture extends Model {
    static associate(models) {
      this.belongsTo(models.Category, { as: "category" });
    }
  }
  Furniture.init(FurnitureSchema(DataTypes), {
    sequelize,
    modelName: "Furniture",
    timestamps: false,
  });
  return Furniture;
};
