
const express = require('express');
const auth = require('../middleware/auth.middleware');
const { checkPermission } = require('../middleware/permission.middleware');
const {
  getRolePermissions,
  upsertPermission,
  deletePermission
} = require('../controllers/permissions.controller');

const router = express.Router();


router.get('/role/:roleId', auth, async (req, res, next) => {
  if (req.user.role && req.user.role.toLowerCase() !== 'admin') {
    return res.status(403).json({ message: 'Only Admin can view role permissions' });
  }
  next();
}, getRolePermissions);


router.post('/role/:roleId', auth, async (req, res, next) => {
  if (req.user.role && req.user.role.toLowerCase() !== 'admin') {
    return res.status(403).json({ message: 'Only Admin can set permissions' });
  }
  next();
}, upsertPermission);


router.delete('/:id', auth, async (req, res, next) => {
  if (req.user.role && req.user.role.toLowerCase() !== 'admin') {
    return res.status(403).json({ message: 'Only Admin can delete permissions' });
  }
  next();
}, deletePermission);

module.exports = router;

