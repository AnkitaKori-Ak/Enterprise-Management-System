const express = require('express');
const auth = require('../middleware/auth.middleware');
const { checkPermission } = require('../middleware/permission.middleware');
const { createProduct, listProducts } = require('../controllers/products.controller');

const router = express.Router();

router.get('/', auth, checkPermission('product','read'), listProducts);
router.post('/', auth, checkPermission('product','create'), createProduct);


module.exports = router;
