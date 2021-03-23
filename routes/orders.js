const router = require('express').Router();
const orderCtrl = require('../controllers/orders');
const { authorize } = require('../middleware/auth');

router.post('/list-orders', authorize, orderCtrl.listOrders);
router.post('/filter-orders', authorize, orderCtrl.filterProducts);

module.exports = router;