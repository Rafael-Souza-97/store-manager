const connection = require('./db/connection');

const getAllProducts = async () => {
  const [result] = await connection.execute(
    'SELECT * FROM StoreManager.products',
  );

  return result;
};

const getProductsById = async (id) => {
  const [[result]] = await connection.execute(
    `SELECT * FROM StoreManager.products
    WHERE id = ?`,
    [id],
  );

  return result;
};

const insertProduct = async (product) => {
  const [{ insertId }] = await connection.execute(
  `INSERT INTO StoreManager.products (name)
  VALUE (?)`,
  [product.name],
  );
  
  return insertId;
};

const updateProducts = async (id, { name }) => {
  await connection.execute(`
  UPDATE StoreManager.products
  SET name = ?
  WHERE id = ?`,
  [name, id]);

  return { id, name };
};

module.exports = {
  getAllProducts,
  getProductsById,
  insertProduct,
  updateProducts,
};
