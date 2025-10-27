const pool = require('../config/db');

// CREATE
exports.createEnterprise = async (req, res) => {
  const { name, location, contact_info } = req.body;
  try {
    await pool.query(
      'INSERT INTO enterprises (name, location, contact_info) VALUES (?,?,?)',
      [name, location, contact_info]
    );
    res.json({ message: 'Enterprise created' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'DB error' });
  }
};

// READ (all)
exports.getEnterprises = async (_, res) => {
  const [rows] = await pool.query('SELECT * FROM enterprises');
  res.json(rows);
};

// UPDATE
exports.updateEnterprise = async (req, res) => {
  const id = parseInt(req.params.id, 10);
  const { name, location, contact_info } = req.body;
  try {
    await pool.query(
      'UPDATE enterprises SET name=?, location=?, contact_info=? WHERE id=?',
      [name, location, contact_info, id]
    );
    res.json({ message: 'Enterprise updated' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'DB error' });
  }
};

// DELETE
exports.deleteEnterprise = async (req, res) => {
  const id = parseInt(req.params.id, 10);
  try {
    await pool.query('DELETE FROM enterprises WHERE id=?', [id]);
    res.json({ message: 'Enterprise deleted' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'DB error' });
  }
};
