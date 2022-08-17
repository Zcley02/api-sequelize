const express = require("express");
const passport = require("passport");
const router = express.Router();

const {
  getAllUsers,
  updateProfileUser,
} = require("../controllers/user.controller");
const validatorFieldsHandler = require("../middlewares/validator.handler");
const { updateUserSchema, findUserSchema } = require("../schema/user.schema");

router.get("/", getAllUsers);
router.put(
  "/",
  passport.authenticate("jwt", { session: false }),
  validatorFieldsHandler(updateUserSchema, "body"),
  updateProfileUser
);

module.exports = router;
