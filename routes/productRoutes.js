const express = require('express');
const router = express.Router();


const productController = require('../controllers/productController');
const { validateProductBody } = require('../middlewares/validationMiddleware');

router.route('/')
    .get(productController.getAllProducts)
    .post(validateProductBody,productController.createProduct);


router.route('/:id')
    .get(productController.getProductById)
    .put(productController.updateProduct)
    .delete(productController.deleteProduct);


module.exports = router;