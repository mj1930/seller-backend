const router = require('express').Router();
const orderCtrl = require('../controllers/orders');
const { authorize } = require('../middleware/auth');

router.post('/list-orders', authorize, orderCtrl.listOrders);
router.post('/filter-orders', authorize, orderCtrl.filterOrders);
router.post('/get-orders-by-date', authorize, orderCtrl.getOrdersByDate);
router.post('/update-order', authorize, orderCtrl.updateOrderStatus);
router.post('/sort-order', authorize, orderCtrl.sortOrder);
router.post('/search-product', authorize, orderCtrl.searchOrdersByTerm);
router.post('/search-product-id', authorize, orderCtrl.searchOrdersByOrderId);

module.exports = router;