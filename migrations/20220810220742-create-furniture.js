"use strict";

const FurnitureSchema = require("../models/schema/furniture.schema");
const CategorySchema = require("../models/schema/category.schema");

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable(
      "Categories",
      CategorySchema(Sequelize.DataTypes)
    );
    await queryInterface.createTable(
      "Furniture",
      FurnitureSchema(Sequelize.DataTypes)
    );
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("Furniture");
    await queryInterface.dropTable("Categories");
  },
};
