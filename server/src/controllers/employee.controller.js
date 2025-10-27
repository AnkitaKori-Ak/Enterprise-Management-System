const pool = require('../config/db');

exports.createEmployee = async (req, res) => {
  const { name, department, role, salary, status, enterprise_id } = req.body;
  try {
    await pool.query(
      'INSERT INTO employees (name, department, role, salary, status, enterprise_id) VALUES (?,?,?,?,?,?)',
      [name, department, role, salary, status, enterprise_id]
    );
    res.json({ message: 'Employee created' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'DB error' });
  }
};

exports.getEmployees = async (_, res) => {
  const [rows] = await pool.query('SELECT * FROM employees');
  res.json(rows);
};

exports.updateEmployee = async (req, res) => {
  const id = parseInt(req.params.id, 10);
  const { name, department, role, salary, status } = req.body;
  try {
    await pool.query(
      'UPDATE employees SET name=?, department=?, role=?, salary=?, status=? WHERE id=?',
      [name, department, role, salary, status, id]
    );
    res.json({ message: 'Employee updated' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'DB error' });
  }
};

exports.deleteEmployee = async (req, res) => {
  const id = parseInt(req.params.id, 10);
  try {
    await pool.query('DELETE FROM employees WHERE id=?', [id]);
    res.json({ message: 'Employee deleted' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'DB error' });
  }
};
