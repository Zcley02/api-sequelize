const express = require("express");
const passport = require("passport");
const router = express.Router();

const {
  getAllUsers
} = require("../controllers/user.controller");

router.get("/", getAllUsers);


module.exports = router;
