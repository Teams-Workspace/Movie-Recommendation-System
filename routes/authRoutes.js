// routes/authRoutes.js
const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController'); // Import the controller
const upload = require('./auth'); // Import the upload routes from auth.js

// Authentication routes
router.get('/signup', authController.getSignupPage);
router.get('/login', authController.getLoginPage);
router.post('/signup', authController.signup);
router.post('/login', authController.login);
router.get('/logout', authController.logout); // Add logout route

// Integrate the profile picture upload route
router.use('/', upload); // Mounting the upload routes

module.exports = router;
