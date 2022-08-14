const express = require("express");
const passport = require("passport");
const router = express.Router();

const { getAllUsers, signUp } = require("../controllers/user.controller");

router.get("/", getAllUsers);
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

module.exports = router;
