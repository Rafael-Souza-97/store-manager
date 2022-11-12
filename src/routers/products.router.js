const express = require('express');
const productsController = require('../controllers/product.controller');

const router = express.Router();

router.get('/', productsController.getProducts);
router.get('/:id', productsController.getProductsById);
router.post('/', productsController.insertProduct);

module.exports = router;
