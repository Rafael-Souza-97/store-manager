const connection = require('./db/connection');

const getSalesId = async () => {
  const [{ insertId }] = await connection.execute(
  'INSERT INTO StoreManager.sales () VALUE ()',
  );

  return insertId;
};

const insertSales = async (saleId, { productId, quantity }) => {
  await connection.execute(
    'INSERT INTO StoreManager.sales_products (sale_id, product_id, quantity) VALUE (?, ?, ?)',
    [saleId, productId, quantity],
  );

  return { saleId, productId, quantity };
};

module.exports = {
  getSalesId,
  insertSales,
};