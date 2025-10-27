const pool = require('../config/db');

exports.getRoles = async (_, res) => {
  const [rows] = await pool.query('SELECT * FROM roles');
  res.json(rows);
};

exports.createRole = async (req, res) => {
  const { name, description } = req.body;
  try {
    await pool.query('INSERT INTO roles (name, description) VALUES (?,?)', [name, description]);
    res.json({ message: 'Role created' });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};
