const express = require('express');
const auth = require('../middleware/auth.middleware');
const { checkPermission } = require('../middleware/permission.middleware');
const {
  createEnterprise,
  getEnterprises,
  updateEnterprise,
  deleteEnterprise
} = require('../controllers/enterprise.controller');

const router = express.Router();

router.get('/',     auth, checkPermission('enterprise','read'),   getEnterprises);
router.post('/',    auth, checkPermission('enterprise','create'), createEnterprise);
router.put('/:id',  auth, checkPermission('enterprise','update'), updateEnterprise);
router.delete('/:id', auth, checkPermission('enterprise','delete'), deleteEnterprise);

module.exports = router;

