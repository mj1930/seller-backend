const router = require('express').Router();
const orderCtrl = require('../controllers/orders');
const { authorize } = require('../middleware/auth');

router.post('/list-orders', authorize, orderCtrl.listOrders);
router.post('/filter-orders', authorize, orderCtrl.filterOrders);
router.post('/get-orders-by-date', authorize, orderCtrl.getOrdersByDate);

module.exports = router;