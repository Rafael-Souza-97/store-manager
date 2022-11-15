const express = require('express');
const salesController = require('../controllers/sales.controller');
const { saleValidation } = require('../middlewares/validateSales.middleware');

const salesRouter = express.Router();

salesRouter.post('/', saleValidation, salesController.insertSales);

module.exports = salesRouter;
