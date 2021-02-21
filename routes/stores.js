const router = require('express').Router();
const storeCtrl = require('../controllers/stores');
const { authorize } = require('../middleware/auth');
const { upload } = require('../helpers/file-upload');

router.post('/add-seller-address-details', authorize, storeCtrl.addSellerAddressDetails);
router.post('/add-seller-bank-details', authorize, upload.array('file', 1), storeCtrl.addSellerBankDetails);
router.post('/add-seller-gst-details', authorize, upload.array('file', 2), storeCtrl.addSellerGstDetails);

module.exports = router;