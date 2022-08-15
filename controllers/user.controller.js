const boom = require("@hapi/boom");
const User = require("../models").User;

const getAllUsers = async (req, res) => {
  try {
    const user = await User.findAll();

    return res.json(user);
  } catch (error) {
    return res.status(500).json({
      error: error.message,
    });
  }
};



const updateUser = async (id, data) => {
  try {
    const user = await User.findByPk(id);
    const updateUser = await user.update(data);

    return updateUser;
  } catch (error) {
    throw boom.unauthorized();
  }
};

module.exports = {
  getAllUsers,
  updateUser
};
