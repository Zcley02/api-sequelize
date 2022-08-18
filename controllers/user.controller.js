const boom = require("@hapi/boom");
const User = require("../models").User;
const bcrypt = require("bcrypt");
const { deleteFile } = require("../utils/multer/multer");

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

const updateProfileUser = async (req, res) => {

  const { id } = req.user;
  let data = req.body;

  try {
    
    const user = await User.findByPk(id);

    if (req.body.password) {

      const salt = bcrypt.genSaltSync();
      const newPassword = bcrypt.hashSync(req.body.password, salt);
      console.log(newPassword);
      req.body.password = newPassword;

    }

    if(req.file){
      await deleteFile(user.profilePic);
      data = {
        ...data,
        profilePic: req.file.filename
      }
    }

    const updatedUser = await user.update(data);
    delete updatedUser.dataValues.password;

    res.json({
      sucess: true,
      user: updatedUser
    })

  } catch (error) {
    res.status(500).json({
      error: error.message
    })
  }

}

module.exports = {
  getAllUsers,
  updateUser,
  updateProfileUser
};
