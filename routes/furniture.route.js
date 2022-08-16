const express = require("express");
const passport = require("passport");
const {
  getAllFurniture,
  findFurniture,
  createFurniture,
  deleteFurniture,
  updateFurniture,
} = require("../controllers/furniture.controller");
const validatorFieldsHandler = require("../middlewares/validator.handler");
const { createFurnitureSchema, findFurnitureSchema, updateFurnitureSchema, deleteFurnitureSchema } = require("../schema/furniture.schema");
const router = express.Router();

router.get("/", getAllFurniture);
router.get("/:id", findFurniture);
router.post(
  "/",
  passport.authenticate("jwt", { session: false }),
  validatorFieldsHandler(createFurnitureSchema, "body"),
  createFurniture
);
router.put(
  "/:id",
  passport.authenticate("jwt", { session: false }),
  validatorFieldsHandler(findFurnitureSchema, "params"),
  validatorFieldsHandler(updateFurnitureSchema, "body"),
  updateFurniture
);
router.delete(
  "/:id",
  passport.authenticate("jwt", { session: false }),
  validatorFieldsHandler(deleteFurnitureSchema, "params"),
  deleteFurniture
);

module.exports = router;
