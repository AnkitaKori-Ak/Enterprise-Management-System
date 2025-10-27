const express = require('express');
const auth = require('../middleware/auth.middleware');
const { getUsers, createUser } = require('../controllers/users.controller');
const router = express.Router();

router.get('/', auth, getUsers);
router.post('/', auth, createUser);

module.exports = router;

