const camelize = require('camelize');
const connection = require('./db/connection');

const getAllSales = async () => {
  const [result] = await connection.execute(
    `SELECT sale_id, date, product_id, quantity
    FROM StoreManager.sales AS s
    INNER JOIN StoreManager.sales_products AS sp
    ON s.id = sp.sale_id
    ORDER BY id, product_id`,
  );

  return camelize(result);
};

const getSalesById = async (id) => {
  const [result] = await connection.execute(
    `SELECT date, product_id, quantity
    FROM StoreManager.sales AS s
    INNER JOIN StoreManager.sales_products AS sp
    ON s.id = sp.sale_id
    WHERE id = ?
    ORDER BY id, product_id`,
    [id],
  );
  return camelize(result);
};

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

const updateSales = async (id, { productId, quantity }) => {
  await connection.execute(`
  UPDATE StoreManager.sales_products 
  SET quantity = ? 
  WHERE sale_id = ? 
  AND product_id = ?`,
  [quantity, id, productId]);

  return { id, productId, quantity };
};

const deleteSale = async (id) => {
  await connection.execute(`
  DELETE FROM StoreManager.sales
  WHERE id = ?`,
  [id]);

  await connection.execute(`
  DELETE FROM StoreManager.sales_products
  WHERE sale_id = ?`,
  [id]);

  return { id };
};

module.exports = {
  getAllSales,
  getSalesById,
  getSalesId,
  insertSales,
  deleteSale,
  updateSales,
};