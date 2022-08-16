const { Category } = require("../models/index");

const getCategories = async (req, res) => {
  try {
    const categories = await Category.findAll();

    res.json(categories);
  } catch (error) {
    res.status(500).json({
      error: error.message,
    });
  }
};

const findCategory = async (req, res) => {
  const { id } = req.params;

  try {
    const category = await Category.findByPk(id);

    if(!category) {
      return res.status(500).json({
        error: "The category does not exist"
      });
    }

    res.json(category);
  } catch (error) {
    res.status(500).json({
      error: error.message,
    });
  }
};

const createCategory = async (req, res) => {
  const { name, description } = req.body;

  try {
    const newCategory = await Category.create({
      name,
      description,
    });

    res.json({
      success: true,
      category: newCategory,
    });
  } catch (error) {
    res.status(500).json({
      error: error.message,
    });
  }
};

const updateCategory = async (req, res) => {
  const { id } = req.params;
  const data = req.body;

  try {
    const category = await Category.findByPk(id);
    const updatedCategory = await category.update(data);

    res.json({
      success: true,
      category: updatedCategory,
    });
  } catch (error) {
    res.status(500).json({
      error: error.message,
    });
  }
};

const deleteCategory = async (req, res) => {
  const { id } = req.params;

  try {
    await Category.destroy({
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
  getCategories,
  findCategory,
  createCategory,
  updateCategory,
  deleteCategory,
};
