const express = require('express');
const productsController = require('../controllers/product.controller');
const { productNameValidation } = require('../middlewares/validateProducts.middleware');

const productsRouter = express.Router();

productsRouter.get('/', productsController.getProducts);
productsRouter.get('/:id', productsController.getProductsById);
productsRouter.post('/', productNameValidation, productsController.insertProduct);
productsRouter.put('/:id', productNameValidation, productsController.updateProduct);
productsRouter.delete('/:id', productsController.deleteProduct);

module.exports = productsRouter;
