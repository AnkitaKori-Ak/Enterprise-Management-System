const pool = require('../config/db');

exports.createProduct = async (req, res) => {
  const { name, sku, price, category, status, enterprise_id } = req.body;
  try {
    await pool.query(
      'INSERT INTO products (name, sku, price, category, status, enterprise_id) VALUES (?,?,?,?,?,?)',
      [name, sku, price, category, status, enterprise_id]
    );
    res.json({ message: 'Product created' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'DB error' });
  }
};

exports.getProducts = async (_, res) => {
  const [rows] = await pool.query('SELECT * FROM products');
  res.json(rows);
};

exports.updateProduct = async (req, res) => {
  const id = parseInt(req.params.id, 10);
  const { name, sku, price, category, status } = req.body;
  try {
    await pool.query(
      'UPDATE products SET name=?, sku=?, price=?, category=?, status=? WHERE id=?',
      [name, sku, price, category, status, id]
    );
    res.json({ message: 'Product updated' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'DB error' });
  }
};

exports.deleteProduct = async (req, res) => {
  const id = parseInt(req.params.id, 10);
  try {
    await pool.query('DELETE FROM products WHERE id=?', [id]);
    res.json({ message: 'Product deleted' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'DB error' });
  }
};
