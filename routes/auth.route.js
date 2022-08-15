const express = require("express");
const passport = require("passport");
const router = express.Router();

const { signUp, recoverPassword, changePassword } = require('../controllers/auth.controller');

router.post("/signup", signUp);
router.post(
  "/login",
  passport.authenticate("local", { session: false }),
  async (req, res, next) => {
    try {
      res.json(req.user);
    } catch (error) {
      next(error);
    }
  }
);
router.post("/recovery", recoverPassword);
router.post("/change-password", changePassword);

module.exports = router;