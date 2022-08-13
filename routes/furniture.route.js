const express = require("express");
const {
  getAllFurniture,
  findFurniture,
  createFurniture,
  deleteFurniture,
  updateFurniture,
} = require("../controllers/furniture.controller");
const router = express.Router();

router.get("/", getAllFurniture);
router.get("/:id", findFurniture);
router.post("/", createFurniture);
router.put("/:id", updateFurniture);
router.delete("/:id", deleteFurniture);

module.exports = router;
