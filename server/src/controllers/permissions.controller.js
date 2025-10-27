
const pool = require('../config/db');

exports.getRolePermissions = async (req, res) => {
  const roleId = parseInt(req.params.roleId, 10);
  if (!roleId) return res.status(400).json({ message: 'roleId required' });

  try {
    const [rows] = await pool.query(
      `SELECT id, module_name, can_create, can_read, can_update, can_delete
       FROM role_permissions WHERE role_id = ?`,
      [roleId]
    );
    res.json(rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'DB error' });
  }
};

exports.upsertPermission = async (req, res) => {
  const roleId = parseInt(req.params.roleId, 10);
  const { module_name, can_create=0, can_read=0, can_update=0, can_delete=0 } = req.body;
  if (!roleId || !module_name) return res.status(400).json({ message: 'roleId and module_name required' });

  try {
    await pool.query(
      `INSERT INTO role_permissions (role_id, module_name, can_create, can_read, can_update, can_delete)
       VALUES (?, ?, ?, ?, ?, ?)
       ON DUPLICATE KEY UPDATE can_create = VALUES(can_create), can_read = VALUES(can_read),
         can_update = VALUES(can_update), can_delete = VALUES(can_delete)`,
      [roleId, module_name, !!can_create ? 1 : 0, !!can_read ? 1 : 0, !!can_update ? 1 : 0, !!can_delete ? 1 : 0]
    );
    res.json({ message: 'Permission saved' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'DB error' });
  }
};

exports.deletePermission = async (req, res) => {
  const permId = parseInt(req.params.id, 10);
  if (!permId) return res.status(400).json({ message: 'id required' });
  try {
    await pool.query('DELETE FROM role_permissions WHERE id = ?', [permId]);
    res.json({ message: 'Deleted' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'DB error' });
  }
};
