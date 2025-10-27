
const pool = require('../config/db');

function checkPermission(moduleName, action) {
  const valid = new Set(['create','read','update','delete']);
  if (!valid.has(action)) throw new Error('Invalid permission action: ' + action);

  return async (req, res, next) => {
    try {
     
      if (!req.user) return res.status(401).json({ message: 'Authentication required' });

    
      if (req.user.role && String(req.user.role).toLowerCase() === 'admin') return next();

      const roleId = req.user.role_id || req.user.roleId || req.user.roleId; 
      if (!roleId) return res.status(403).json({ message: 'No role assigned' });

      const [rows] = await pool.query(
        `SELECT can_create, can_read, can_update, can_delete
         FROM role_permissions
         WHERE role_id = ? AND module_name = ? LIMIT 1`,
        [roleId, moduleName]
      );

      const perm = rows[0];
      if (!perm) return res.status(403).json({ message: 'No permissions configured for this role/module' });

      const map = {
        create: perm.can_create,
        read: perm.can_read,
        update: perm.can_update,
        delete: perm.can_delete
      };

      if (map[action]) return next();
      return res.status(403).json({ message: `Forbidden: missing ${action} permission on ${moduleName}` });

    } catch (err) {
      console.error('permission check error', err);
      return res.status(500).json({ message: 'Permission check failed' });
    }
  };
}

module.exports = { checkPermission };
