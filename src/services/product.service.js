const productsModel = require('../models/product.model');
const { nameValidation } = require('./validations/nameValidations.service');
const { HTTP_NOT_FOUND } = require('../utils/errorsMap');

const getProducts = async () => {
  const allProducts = await productsModel.getAllProducts();

  return { type: null, message: allProducts };
};

const getProductsById = async (id) => {
  const idProducts = await productsModel.getProductsById(id);

  if (!idProducts) {
    return { type: HTTP_NOT_FOUND, message: 'Product not found' };
  }

  return { type: null, message: idProducts };
};

const insertProduct = async (product) => {
  const productError = nameValidation(product.name);

  if (productError.type) return productError;

  const resultId = await productsModel.insertProduct(product);
  const result = await productsModel.getProductsById(resultId);

  return { type: null, message: result };
};

module.exports = {
  getProducts,
  getProductsById,
  insertProduct,
};
