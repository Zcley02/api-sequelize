const express = require("express");
const passport = require("passport");
const router = express.Router();

const {
  signUp,
  recoverPassword,
  changePassword,
} = require("../controllers/auth.controller");
const validatorFieldsHandler = require("../middlewares/validator.handler");
const {
  signUpSchema,
  recoverySchema,
  changePasswordSchema,
} = require("../schema/auth.schema");

router.post(
  "/signup", 
  validatorFieldsHandler(signUpSchema, "body"), 
  signUp
);
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
router.post(
  "/recovery",
  validatorFieldsHandler(recoverySchema, "body"),
  recoverPassword
);
router.post(
  "/change-password",
  validatorFieldsHandler(changePasswordSchema, "body"),
  changePassword
);

module.exports = router;
