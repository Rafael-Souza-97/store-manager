const express = require('express');
const productsController = require('../controllers/product.controller');
const productValidation = require('../middlewares/validateProducts.middleware');

const productsRouter = express.Router();

productsRouter.get('/', productsController.getProducts);
productsRouter.get('/:id', productsController.getProductsById);
productsRouter.post('/', productValidation.productNameValidation, productsController.insertProduct);

module.exports = productsRouter;
