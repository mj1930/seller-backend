const router = require('express').Router();
const storeCtrl = require('../controllers/stores');
const { authorize } = require('../middleware/auth');
const { upload } = require('../helpers/file-upload');

router.post('/verify-storename', authorize, storeCtrl.verifyStoreName);
router.post('/add-gst-images', authorize, upload.array('files', 2), storeCtrl.addImages);
router.post('/add-bank-image', authorize, upload.single('file'), storeCtrl.addBankImage);
router.post('/add-seller-address-details', authorize, storeCtrl.addSellerAddressDetails);
router.post('/add-seller-bank-details', authorize, storeCtrl.addSellerBankDetails);
router.post('/add-seller-gst-details', authorize, storeCtrl.addSellerGstDetails);

module.exports = router;