const express = require('express');
const router = express.Router();

const categoryController = require('../controllers/categoryController');
const { validateCategoryBody } = require('../middlewares/validationMiddleware');


router.route('/')
    .get(categoryController.getAllCategories)
    .post(validateCategoryBody, categoryController.createCategory);


router.route('/:id')
    .get(categoryController.getCategoryById)
    .put(validateCategoryBody, categoryController.updateCategory)
    .delete(categoryController.deleteCategory);

module.exports = router;