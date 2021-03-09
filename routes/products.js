const router = require('express').Router();
const productCtrl = require('../controllers/products');
const { authorize } = require('../middleware/auth');

router.post('/add-product', authorize, productCtrl.addNewProduct);
router.post('/get-all-products', productCtrl.listAllProduct);
router.post('/filter-products', productCtrl.filterProducts);

module.exports = router;