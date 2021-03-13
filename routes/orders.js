const router = require('express').Router();
const orderCtrl = require('../controllers/orders');

router.post('/add-order', orderCtrl.addOrder);
router.post('/list-orders', orderCtrl.listOrders);
router.post('/filter-orders', orderCtrl.filterProducts);

module.exports = router;