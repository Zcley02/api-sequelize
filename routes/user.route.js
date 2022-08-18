const express = require("express");
const multer = require("multer");
const passport = require("passport");
const router = express.Router();

const {
  getAllUsers,
  updateProfileUser,
} = require("../controllers/user.controller");
const validatorFieldsHandler = require("../middlewares/validator.handler");
const { updateUserSchema } = require("../schema/user.schema");
const { storage } = require("../utils/multer/multer");

const upload = multer({storage: storage});

router.get("/", getAllUsers);
router.put(
  "/",
  passport.authenticate("jwt", { session: false }),
  upload.single("profilePic"),
  validatorFieldsHandler(updateUserSchema, "body"),
  updateProfileUser
);

module.exports = router;
