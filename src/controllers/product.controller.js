const productsService = require('../services/product.service');

const getProducts = async (_req, res) => {
  const { type, message } = await productsService.getProducts();

  if (type) return res.status(type).json({ message });

  return res.status(200).json(message);
};

const getProductsById = async (req, res) => {
  const { id } = req.params;

  const { type, message } = await productsService.getProductsById(id);

  if (type) return res.status(type).json({ message });

  return res.status(200).json(message);
};

const getProductByName = async (req, res) => {
  const { q } = req.query;

  const { message } = await productsService.getProductByName(q);

  return res.status(200).json(message);
};

const insertProduct = async (req, res) => {
  const { type, message } = await productsService.insertProduct(req.body);

  if (type) return res.status(type).json({ message });

  res.status(201).json(message);
};

const updateProduct = async (req, res) => {
  const { id } = req.params;
  const productId = Number(id);

  const { type, message } = await productsService.updateProduct(productId, req.body);

  if (type) return res.status(type).json({ message });

  return res.status(200).json(message);
};

const deleteProduct = async (req, res) => {
  const { id } = req.params;

  const { type, message } = await productsService.deleteProduct(id);

  if (type) return res.status(type).json({ message });

  return res.status(204).json(message);
};

module.exports = {
  getProducts,
  getProductsById,
  getProductByName,
  insertProduct,
  updateProduct,
  deleteProduct,
};
