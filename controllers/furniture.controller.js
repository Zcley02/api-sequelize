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

const findFurniture = async (req, res) => {
  const { id } = req.params;

  try {
    const furniture = await Furniture.findByPk(id, {
      include: {
        association: "category",
        attributes: ["name"],
      },
    });

    res.json(furniture);
  } catch (error) {
    res.status(500).json({
      error: error.message,
    });
  }
};

const createFurniture = async (req, res) => {
  try {
    const newFurniture = await Furniture.create(req.body);

    res.json({
      success: true,
      fruniture: newFurniture,
    });
  } catch (error) {
    res.status(500).json({
      error: error.message,
    });
  }
};

const updateFurniture = async (req, res) => {
  const { id } = req.params;

  try {
    const furniture = await Furniture.findByPk(id);
    const updatedFurniture = await furniture.update(req.body);

    res.json({
      succes: true,
      furniture: updatedFurniture,
    });
  } catch (error) {
    res.status(500).json({
      error: error.message,
    });
  }
};

const deleteFurniture = async (req, res) => {
  const { id } = req.params;

  try {
    await Furniture.destroy({
      where: {
        id,
      },
    });

    res.json({
      success: true,
    });
  } catch (error) {
    res.status(500).json({
      error: error.message,
    });
  }
};

module.exports = {
  getAllFurniture,
  findFurniture,
  createFurniture,
  updateFurniture,
  deleteFurniture,
};
