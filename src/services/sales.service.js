const salesModel = require('../models/sales.model');

const insertSales = async (sales) => {
  const saleId = await salesModel.getSalesId();

  await Promise.all(sales.map(async (obj) => salesModel.insertSales(saleId, obj)));

  const response = { id: saleId, itemsSold: sales };

  return { type: null, message: response };
};

module.exports = {
  insertSales,
};
