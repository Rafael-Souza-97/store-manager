const productsService = require('../services/product.service');
const {
  HTTP_STATUS_OK,
  HTTP_STATUS_CREATED,
  HTTP_STATUS_NO_CONTENT,
} = require('../utils/statusCode');

const getProducts = async (_req, res) => {
  const { type, message } = await productsService.getProducts();

  if (type) return res.status(type).json({ message });

  return res.status(HTTP_STATUS_OK).json(message);
};

const getProductsById = async (req, res) => {
  const { id } = req.params;

  const { type, message } = await productsService.getProductsById(id);

  if (type) return res.status(type).json({ message });

  return res.status(HTTP_STATUS_OK).json(message);
};

const getProductByName = async (req, res) => {
  const { q } = req.query;

  const { message } = await productsService.getProductByName(q);

  return res.status(HTTP_STATUS_OK).json(message);
};

const insertProduct = async (req, res) => {
  const { type, message } = await productsService.insertProduct(req.body);

  if (type) return res.status(type).json({ message });

  res.status(HTTP_STATUS_CREATED).json(message);
};

const updateProduct = async (req, res) => {
  const { id } = req.params;
  const productId = Number(id);

  const { type, message } = await productsService.updateProduct(productId, req.body);

  if (type) return res.status(type).json({ message });

  return res.status(HTTP_STATUS_OK).json(message);
};

const deleteProduct = async (req, res) => {
  const { id } = req.params;

  const { type, message } = await productsService.deleteProduct(id);

  if (type) return res.status(type).json({ message });

  return res.status(HTTP_STATUS_NO_CONTENT).json(message);
};

module.exports = {
  getProducts,
  getProductsById,
  getProductByName,
  insertProduct,
  updateProduct,
  deleteProduct,
};
