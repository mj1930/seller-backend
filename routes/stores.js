const router = require('express').Router();
const storeCtrl = require('../controllers/stores');
const { authorize } = require('../middleware/auth');

router.post('/add-seller-details', authorize, storeCtrl.addSellerDetails);

module.exports = router;