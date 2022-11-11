const productsModel = require('../models/product.model');
const errorCodes = require('../utils/errorsMap');

const getProducts = async () => {
  const allProducts = await productsModel.getAllProducts();

  return { type: null, message: allProducts };
};

const getProductsById = async (id) => {
  const idProducts = await productsModel.getProductsById(id);
  console.log(idProducts.length);

  if (idProducts.length === 1) {
    return { type: null, message: idProducts[0] };
  }

  const { HTTP_NOT_FOUND } = errorCodes;
  return { type: HTTP_NOT_FOUND, message: 'Product not found' };
};

module.exports = {
  getProducts,
  getProductsById,
};
