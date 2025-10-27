const express = require('express');
const auth = require('../middleware/auth.middleware');
const { checkPermission } = require('../middleware/permission.middleware');
const {
  createProduct,
  getProducts,
  updateProduct,
  deleteProduct
} = require('../controllers/product.controller');

const router = express.Router();

router.get('/',     auth, checkPermission('product','read'),   getProducts);
router.post('/',    auth, checkPermission('product','create'), createProduct);
router.put('/:id',  auth, checkPermission('product','update'), updateProduct);
router.delete('/:id', auth, checkPermission('product','delete'), deleteProduct);

module.exports = router;
