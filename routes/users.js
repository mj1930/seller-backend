const router = require('express').Router();
const userCtrl = require('../controllers/users');

router.post('/login', userCtrl.login);
router.post('/signup', userCtrl.signup);
router.post('/add-seller-details', userCtrl.addSellerDetails);

module.exports = router;