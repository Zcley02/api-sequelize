const express = require('express');
const { getCategories, findCategory, createCategory, updateCategory, deleteCategory } = require('../controllers/category.controller');

const router = express.Router();

router.get('/', getCategories);
router.get('/:id', findCategory);
router.post('/', createCategory);
router.put('/:id', updateCategory);
router.delete('/:id', deleteCategory);

module.exports = router;