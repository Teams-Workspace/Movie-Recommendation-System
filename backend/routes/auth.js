const express = require('express');
const { verifyToken } = require('../config/JWTconfig');
const { registerUser, loginUser, getCurrentUser} = require('../controllers/authController') 
const router = express.Router();

router.post('/register', registerUser)
router.post('/login', loginUser)
router.get('/current-user', verifyToken, getCurrentUser)

module.exports = router;