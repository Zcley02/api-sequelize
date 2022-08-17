const jwt = require("jsonwebtoken");

const signToken = (id, name, jwtCode) => {
  const payload = {
    id,
    name,
  };

  const token = jwt.sign(payload, jwtCode, { expiresIn: "2h" });

  return token;
};

module.exports = signToken;