const salesService = require('../services/sales.service');
const productsModel = require('../models/product.model');
const { HTTP_NOT_FOUND } = require('../utils/errorsMap');

const insertSales = async (req, res) => {
  const sales = req.body;

  const validatedId = await Promise.all(sales.map(async ({ productId }) => {
    const product = await productsModel.getProductsById(productId);

    if (product === undefined || !productId) {
      return 'Product Not Found';
    }
    return 'HTTP_STATUS_OK';
  }));

  const valideId = validatedId.every((string) => string === 'HTTP_STATUS_OK');

  if (!valideId) {
    return res.status(HTTP_NOT_FOUND).json({ message: 'Product not found' });
  } 
    const { message } = await salesService.insertSales(sales);

    res.status(201).json(message);
};

module.exports = {
 insertSales,
};