
// authRoutes.js
const express = require('express');
const router = express.Router();
const upload = require('../middleware/uploadMiddleware');
const authController = require('../controllers/authController');

router.get('/signup', authController.getSignupPage);
router.get('/login', authController.getLoginPage);

router.post('/signup', authController.signup);
router.post('/login', authController.login);
router.get('/logout', authController.logout); // Add logout route

router.post('/upload-profile-pic', upload.single('profile_picture'), authController.uploadProfilePic);

module.exports = router;




