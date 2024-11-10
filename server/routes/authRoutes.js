// /server/routes/authRoutes.js

const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');

// Route to send password reset link
router.post('/send-reset-link', authController.sendResetLink);

// Route to handle password reset
router.post('/reset-password/:token', authController.resetPassword);

module.exports = router;
