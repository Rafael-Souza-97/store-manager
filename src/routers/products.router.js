const express = require('express');
const productsController = require('../controllers/product.controller');
const productValidation = require('../middlewares/validateProducts.middleware');

const router = express.Router();

router.get('/', productsController.getProducts);
router.get('/:id', productsController.getProductsById);
router.post('/', productValidation.productNameValidation, productsController.insertProduct);

module.exports = router;
