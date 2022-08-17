const { Sequelize } = require("sequelize");

const UserSchema = (DataTypes) => {
  return {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER,
    },
    firstName: {
      allowNull: false,
      type: DataTypes.STRING,
    },
    lastName: {
      allowNull: false,
      type: DataTypes.STRING,
    },
    email: {
      allowNull: false,
      type: DataTypes.STRING,
    },
    password: {
      allowNull: false,
      type: DataTypes.STRING,
    },
    profilePic: {
      allowNull: true,
      type: DataTypes.STRING,
    },
    active: {
      allowNull: false,
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
    recoveryToken: {
      allowNull: true,
      type: DataTypes.STRING,
    },
    createdAt: {
      allowNull: false,
      type: DataTypes.DATE,
      defaultValue: Sequelize.NOW,
    },
  };
};

module.exports = UserSchema;
