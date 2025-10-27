const express = require('express');
const auth = require('../middleware/auth.middleware');
const { checkPermission } = require('../middleware/permission.middleware');
const {
  createEmployee,
  getEmployees,
  updateEmployee,
  deleteEmployee
} = require('../controllers/employee.controller');

const router = express.Router();

router.get('/',     auth, checkPermission('employee','read'),   getEmployees);
router.post('/',    auth, checkPermission('employee','create'), createEmployee);
router.put('/:id',  auth, checkPermission('employee','update'), updateEmployee);
router.delete('/:id', auth, checkPermission('employee','delete'), deleteEmployee);

module.exports = router;
