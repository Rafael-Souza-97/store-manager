const salesModel = require('../models/sales.model');
const productsService = require('./product.service');
const { HTTP_NOT_FOUND } = require('../utils/errorsMap');

const getSales = async () => {
  const allSales = await salesModel.getAllSales();

  return { type: null, message: allSales };
};

const getSalesById = async (id) => {
  const idSales = await salesModel.getSalesById(id);

  if (!idSales || idSales.length === 0) {
    return { type: HTTP_NOT_FOUND, message: 'Sale not found' };
  }

  return { type: null, message: idSales };
};

const insertSales = async (sales) => {
  const saleId = await salesModel.getSalesId();

  await Promise.all(sales.map(async (obj) => salesModel.insertSales(saleId, obj)));

  const response = { id: saleId, itemsSold: sales };

  return { type: null, message: response };
};

const updateSale = async (id, sale) => {
  const validation = await Promise.all(sale
    .map(async ({ productId }) => productsService.getProductsById(productId)));

  const doesHaveInvalidId = validation.some((product) => product.message === 'Product not found');

  if (doesHaveInvalidId) { 
    return { type: HTTP_NOT_FOUND, message: 'Product not found' };
  }

  const { type } = await getSalesById(id);
  if (type) {
    return { type: HTTP_NOT_FOUND, message: 'Sale not found' };
  }

  const update = await Promise.all(sale.map(async (obj) => salesModel.updateSales(id, obj)));

  return { type: null, message: { saleId: id, itemsUpdated: update } };
};

const deleteSale = async (id) => {
  const { type } = await getSalesById(id);
  if (type) return { type, message: 'Sale not found' };
  
  const deleteIdSale = await salesModel.deleteSale(id);

  return { type: null, message: deleteIdSale };
};

module.exports = {
  getSales,
  getSalesById,
  insertSales,
  deleteSale,
  updateSale,
};
