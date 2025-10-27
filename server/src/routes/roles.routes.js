const express = require('express');
const auth = require('../middleware/auth.middleware');
const { getRoles, createRole } = require('../controllers/roles.controller');
const router = express.Router();

router.get('/', auth, getRoles);
router.post('/', auth, createRole);

module.exports = router;
