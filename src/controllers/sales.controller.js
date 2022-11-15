const salesService = require('../services/sales.service');
const productsModel = require('../models/product.model');

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
    return res.status(404).json({ message: 'Product not found' });
  } 
    const { type, message } = await salesService.insertSales(sales);

    if (type) return res.status(type).json({ message });
  
    res.status(201).json(message);
};

module.exports = {
 insertSales,
};