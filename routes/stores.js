const router = require('express').Router();
const storeCtrl = require('../controllers/stores');
const { authorize } = require('../middleware/auth');
const { upload } = require('../helpers/file-upload');

router.post('/add-seller-details', authorize, upload.array('file', 3), storeCtrl.addSellerDetails);

module.exports = router;