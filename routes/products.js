const router = require('express').Router();
const productCtrl = require('../controllers/products');
const { authorize } = require('../middleware/auth');

router.post('/add-product', authorize, productCtrl.addNewProduct);
router.get('/get-all-products', authorize, productCtrl.listAllProduct);

module.exports = router;