// routes/auth.js
const express = require('express');
const upload = require('../middleware/uploadMiddleware'); // Make sure this is the correct path
const { updateProfilePicture } = require('../controllers/authController'); 

const router = express.Router();

router.post('/upload-profile-pic', upload.single('profile_picture'), updateProfilePicture);

module.exports = router;
