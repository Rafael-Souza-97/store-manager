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

const getProductByName = async (name) => {
  const searchName = `%${name}%`;
  const [result] = await connection.execute(
    `SELECT * FROM StoreManager.products
    WHERE name
    LIKE ?`,
    [searchName],
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

const deleteProduct = async (id) => {
  await connection.execute(`
  DELETE FROM StoreManager.products
  WHERE id = ?`,
  [id]);

  return { id };
};

module.exports = {
  getAllProducts,
  getProductsById,
  getProductByName,
  insertProduct,
  updateProducts,
  deleteProduct,
};
