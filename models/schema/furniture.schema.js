const { Sequelize } = require('sequelize');

const FurnitureSchema = (DataTypes) => {
  return {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER,
    },
    name: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false,
    },
    description: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false,
    },
    image: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    price: {
      type: DataTypes.DOUBLE,
      allowNull: false,
    },
    createdAt: {
      allowNull: false,
      type: DataTypes.DATE,
      defaultValue: Sequelize.NOW,
    },
    categoryId: {
      field: "category_id",
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: "Categories",
        key: "id",
      },
    },
  };
};

module.exports = FurnitureSchema;
