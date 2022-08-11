"use strict";
const { Model } = require("sequelize");
const UserSchema = require("./schema/user.schema");
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    static associate(models) {
      // define association here
    }
  }
  User.init(UserSchema(DataTypes), {
    sequelize,
    modelName: "User",
    timestamps: false,
  });
  return User;
};
