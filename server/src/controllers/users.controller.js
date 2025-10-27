const pool = require('../config/db');
const { hashPassword } = require('../utils/hash');

exports.getUsers = async (_, res) => {
  const [rows] = await pool.query('SELECT id,name,email,role_id,enterprise_id FROM users');
  res.json(rows);
};

exports.createUser = async (req, res) => {
  const { name, email, password, role_id, enterprise_id } = req.body;
  const hash = await hashPassword(password);
  try {
    await pool.query(
      'INSERT INTO users (name,email,password,role_id,enterprise_id) VALUES (?,?,?,?,?)',
      [name, email, hash, role_id, enterprise_id]
    );
    res.json({ message: 'User created' });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};
