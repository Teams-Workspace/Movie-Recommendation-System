const express = require('express');
const router = express.Router();
const adminController = require('../controllers/adminController');
const authenticateToken = require('../middleware/authenticateToken');

router.get('/:adminId', authenticateToken, adminController.getAdminPanel);

module.exports = router;
