const express = require("express");
const passport = require("passport");
const {
  getCategories,
  findCategory,
  createCategory,
  updateCategory,
  deleteCategory,
} = require("../controllers/category.controller");
const validatorFieldsHandler = require("../middlewares/validator.handler");
const {
  findCategorySchema,
  updateCategorySchema,
  createCategorySchema,
} = require("../schema/category.schema");

const router = express.Router();

router.get("/", getCategories);
router.get(
  "/:id",
  validatorFieldsHandler(findCategorySchema, "params"),
  findCategory
);
router.post(
  "/",
  passport.authenticate("jwt", { session: false }),
  validatorFieldsHandler(createCategorySchema, "body"),
  createCategory
);
router.put(
  "/:id",
  passport.authenticate("jwt", { session: false }),
  validatorFieldsHandler(findCategorySchema, "params"),
  validatorFieldsHandler(updateCategorySchema, "body"),
  updateCategory
);
router.delete(
  "/:id",
  passport.authenticate("jwt", { session: false }),
  validatorFieldsHandler(findCategorySchema, "params"),
  deleteCategory
);

module.exports = router;
