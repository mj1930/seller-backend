const router = require('express').Router();
const userCtrl = require('../controllers/users');
const { authorize } = require('../middleware/auth');

router.post('/login', userCtrl.login);
router.post('/signup', userCtrl.signup);
router.get('/get-user-details', authorize, userCtrl.getUserData);

module.exports = router;