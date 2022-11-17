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

  const newProduct = await productsModel.insertProduct(product);
  const result = await getProductsById(newProduct);

  return { type: null, message: result.message };
};

const updateProduct = async (id, product) => {
  const productError = nameValidation(product.name);
  if (productError.type) return productError;

  const { type } = await getProductsById(id);
  if (type) return { type, message: 'Product not found' };
  
  const update = await productsModel.updateProducts(id, product);

  return { type: null, message: update };
};

module.exports = {
  getProducts,
  getProductsById,
  insertProduct,
  updateProduct,
};
