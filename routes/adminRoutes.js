// routes/adminRoutes.js
const express = require('express');
const router = express.Router();
const adminController = require('../controllers/adminController');

router.get('/:adminName', adminController.getAdminPanel);

module.exports = router;
