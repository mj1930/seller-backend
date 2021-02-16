const router = require('express').Router();
const verficationCtrl = require('../controllers/verification');
const { authorize } = require('../middleware/auth');

router.post('/generate-otp', verficationCtrl.sendOTP);
router.post('/verify-otp', verficationCtrl.verifyOtp);
router.post('/send-email-verification', verficationCtrl.sendEmailVerification);
router.post('/send-email-verification',authorize, verficationCtrl.verifyEmail);

module.exports = router;