const express = require('express');
const salesController = require('../controllers/sales.controller');
const { saleValidation } = require('../middlewares/validateSales.middleware');

const salesRouter = express.Router();

salesRouter.get('/', salesController.getSales);
salesRouter.get('/:id', salesController.getSalesById);
salesRouter.post('/', saleValidation, salesController.insertSales);
salesRouter.delete('/:id', salesController.deleteSale);

module.exports = salesRouter;
