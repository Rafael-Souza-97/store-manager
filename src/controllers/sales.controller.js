const salesService = require('../services/sales.service');
const productsModel = require('../models/product.model');
const { HTTP_NOT_FOUND } = require('../utils/errorsMap');

const getSales = async (_req, res) => {
  const { type, message } = await salesService.getSales();

  if (type) return res.status(type).json({ message });

  return res.status(200).json(message);
};

const getSalesById = async (req, res) => {
  const { id } = req.params;

  const { type, message } = await salesService.getSalesById(id);

  if (type) return res.status(type).json({ message });

  return res.status(200).json(message);
};

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
  getSales,
  getSalesById,
  insertSales,
};
