const jwt = require("jsonwebtoken");
const config = require("../config/config");

const signToken = (id, name) => {
  const payload = {
    id,
    name,
  };

  const token = jwt.sign(payload, config.jwtSecret, { expiresIn: "2h" });

  return token;
};

module.exports = signToken;