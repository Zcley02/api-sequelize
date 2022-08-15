const boom = require("@hapi/boom");
const bcrypt = require("bcrypt");
const config = require("../config/config");
const jwt = require("jsonwebtoken");
const signToken = require("../utils/jwt");
const sendMail = require("../utils/mail/sendMail");
const { updateUser } = require("../controllers/user.controller");
const User = require("../models").User;

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

const changePassword = async (req, res) => {
  const { token, newPassword } = req.body;

  try {
    const paylaod = jwt.verify(token, config.jwtSecret);
    const user = await User.findByPk(paylaod.id);
    console.log(user);
    if (user.recoveryToken !== token) {
      throw boom.unauthorized();
    }

    const salt = bcrypt.genSaltSync();
    const hashPass = bcrypt.hashSync(newPassword, salt);
    await updateUser(user.id, { recoveryToken: null, password: hashPass });

    res.json({
      message: "password changed",
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

const recoverPassword = async (req, res) => {
  const { email } = req.body;

  try {
    const user = await User.findOne({
      where: {
        email,
      },
    });

    if (!user) {
      throw boom.unauthorized();
    }

    const token = signToken(user.id, user.email);
    const link = `http://nose.com/recovery?token=${token}`;
    await updateUser(user.id, { recoveryToken: token });
    const mail = {
      from: config.emailSmtp,
      to: `${user.email}`,
      subject: "Email para recuperar contraseña",
      html: `<b>Ingresa a este link => ${link}</b>`,
    };

    const sent = await sendMail(mail);

    res.json(sent);
  } catch (error) {
    res.status(500).json({
      error: error.message,
    });
  }
};

module.exports = {
  signUp,
  login,
  recoverPassword,
  changePassword,
};
