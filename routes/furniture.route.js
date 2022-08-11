const express = require('express');
const { getAllFurniture } = require('../controllers/furniture.controller');
const router = express.Router();


router.get('/', getAllFurniture);

module.exports = router;