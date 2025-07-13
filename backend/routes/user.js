const express = require('express');
const router = express.Router();
const { verifyToken } = require('../config/JWTconfig');
const { updateProfile } = require('../controllers/userController');

router.put('/profile', verifyToken, updateProfile);

module.exports = router;
