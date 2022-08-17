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

    const token = signToken(user.id, user.firstName, config.jwtAuth);
    const link = `http://nose.com/active-user?token=${token}`;
    const mail = {
      from: config.emailSmtp,
      to: `${user.email}`,
      subject: "Email para activar cuenta",
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

const activeUser = async (req, res) => {

  const { token } = req.body;

  try {
    
    const payload = jwt.verify(token, config.jwtAuth);
    console.log(payload);
    const user = await updateUser(payload.id, { active: true });

    res.json({
      "message" : "The user is active"
    });

  } catch (error) {
    res.status(500).json({
      error: error.message,
    });
  }

}

const login = async (email, password) => {
  const user = await User.findOne({
    where: {
      email,
    },
  });

  if (!user) {
    throw boom.unauthorized("This is email is not registered");
  } if (!user.active){
    throw boom.unauthorized("This account is not active");
  }

  const validPass = bcrypt.compareSync(password, user.password);
  if (!validPass) {
    throw boom.unauthorized("Does not match the password");
  }

  delete user.dataValues.password;

  const token = signToken(user.id, user.firstName, config.jwtSecret);

  return {
    user,
    token,
  };
};

const changePassword = async (req, res) => {
  const { token, newPassword } = req.body;

  try {
    const payload = jwt.verify(token, config.jwtAuth);
    const user = await User.findByPk(payload.id);
    console.log(user);
    if (user.recoveryToken !== token) {
      throw boom.unauthorized();
    }

    const salt = bcrypt.genSaltSync();
    const hashPass = bcrypt.hashSync(newPassword, salt);
    await updateUser(user.id, { recoveryToken: null, password: hashPass, active: true });

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
      throw boom.unauthorized("Email does not exist");
    }

    const token = signToken(user.id, user.firstName, config.jwtAuth);
    const link = `http://nose.com/recovery?token=${token}`;
    await updateUser(user.id, { recoveryToken: token, active: false });
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
  activeUser
};
