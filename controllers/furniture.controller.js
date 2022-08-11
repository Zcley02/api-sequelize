const { Furniture } = require("../models/index");

const getAllFurniture = async (req, res) => {
  try {
    const furnitures = await Furniture.findAll({
      include: {
        association: "category",
        attributes: ["name"],
      },
    });

    res.json(furnitures);
  } catch (error) {
    res.status(500).json({
      error: error.message,
    });
  }
};

module.exports = { getAllFurniture };
