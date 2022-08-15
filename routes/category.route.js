const express = require("express");
const passport = require("passport");
const {
  getCategories,
  findCategory,
  createCategory,
  updateCategory,
  deleteCategory,
} = require("../controllers/category.controller");

const router = express.Router();

router.get("/", getCategories);
router.get("/:id", findCategory);
router.post(
  "/",
  passport.authenticate("jwt", { session: false }),
  createCategory
);
router.put("/:id", updateCategory);
router.delete("/:id", deleteCategory);

module.exports = router;
