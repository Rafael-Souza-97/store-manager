const productsModel = require('../models/product.model');
const errorCodes = require('../utils/errorsMap');

const getProducts = async () => {
  const allProducts = await productsModel.getAllProducts();

  return { type: null, message: allProducts };
};

const getProductsById = async (id) => {
  const idProducts = await productsModel.getProductsById(id);

  if (idProducts.length === 0) {
    const { HTTP_NOT_FOUND } = errorCodes;
    return { type: HTTP_NOT_FOUND, message: 'Product not found' };
  }

  return { type: null, message: idProducts[0] };
};

module.exports = {
  getProducts,
  getProductsById,
};
