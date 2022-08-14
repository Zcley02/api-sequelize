const boom = require("@hapi/boom");
const bcrypt = require("bcrypt");
const signToken = require("../utils/jwt");
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

const signUp = async (req, res) => {
  const { email, password } = req.body;

  try {
    const findUser = await User.findOne({
      where: {
        email,
      },
    });

    if (findUser) {
      return res.status(400).json({
        msg: "User already exist",
      });
    }

    const salt = bcrypt.genSaltSync();
    const newPassword = bcrypt.hashSync(password, salt);

    const user = await User.create({
      ...req.body,
      password: newPassword,
    });

    delete user.dataValues.password;

    const token = signToken(user.id, user.firstName);

    res.json({
      user,
      token,
    });
  } catch (error) {
    res.status(500).json({
      error: error.message,
    });
  }
};

const login = async (email, password) => {
  const user = await User.findOne({
    where: {
      email,
    },
  });

  if (!user) {
    throw boom.unauthorized("This is email is not registered");
  }

  const validPass = bcrypt.compareSync(password, user.password);
  if (!validPass) {
    throw boom.unauthorized("Does not match the password");
  }

  delete user.dataValues.password;

  const token = signToken(user.id, user.firstName);

  return {
    user,
    token,
  };
};

const changePassword = async () => {};

module.exports = {
  getAllUsers,
  signUp,
  login,
};
