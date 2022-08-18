const express = require("express");
const multer = require("multer");
const passport = require("passport");
const router = express.Router();

const {
  signUp,
  recoverPassword,
  changePassword,
  activeUser,
} = require("../controllers/auth.controller");
const validatorFieldsHandler = require("../middlewares/validator.handler");
const {
  signUpSchema,
  recoverySchema,
  changePasswordSchema,
} = require("../schema/auth.schema");
const {storage} = require("../utils/multer/multer");

const upload = multer({storage: storage});

router.post(
  "/signup",
  upload.single("profilePic"),
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
router.post(
  "/active-user",
  activeUser
);

module.exports = router;
