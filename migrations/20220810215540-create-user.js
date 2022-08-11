'use strict';

const UserSchema = require("../models/schema/user.schema");

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Users', UserSchema(Sequelize.DataTypes));
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Users');
  }
};