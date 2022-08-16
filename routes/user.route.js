const express = require("express");
const passport = require("passport");
const router = express.Router();

const {
  getAllUsers,
  updateProfileUser,
} = require("../controllers/user.controller");

router.get("/", getAllUsers);
router.put(
  "/",
  passport.authenticate("jwt", { session: false }),
  updateProfileUser
);

module.exports = router;
