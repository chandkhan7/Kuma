const express = require('express');
const nodemailer = require('nodemailer');
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
const cors = require('cors');  // Import cors package

dotenv.config();

const app = express();
app.use(express.json());
app.use(cors());  // Enable CORS for all origins (you can customize it if needed)

const users = [];  // In-memory store for users (replace with a real database)
const RESET_PASSWORD_EXPIRY = 3600000; // 1 hour expiration time for reset token

// Email Transporter configuration
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
  tls: {
    rejectUnauthorized: false,  // To avoid SSL/TLS issues
  },
});

// Send password reset link
app.post('/api/send-reset-link', (req, res) => {
  const { email } = req.body;
  const user = users.find(user => user.email === email);
  
  if (!user) {
    return res.status(404).send('User not found');
  }

  // Generate reset token and expiration time
  const token = jwt.sign({ email }, process.env.JWT_SECRET, { expiresIn: '1h' });

  // Store the token in the user record (in a real app, store it in the database)
  user.resetToken = token;
  user.resetTokenExpiry = Date.now() + RESET_PASSWORD_EXPIRY;

  // Send reset link via email
  const resetLink = `http://localhost:3000/reset-password/${token}`;  // Adjust the URL based on your frontend
  const mailOptions = {
    to: email,
    subject: 'Password Reset',
    text: `Click the following link to reset your password: ${resetLink}`,
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.error('Error sending email:', error);  // Log the error
      return res.status(500).send({ message: 'Error sending reset link' });
    }
    console.log('Email sent: ' + info.response);  // Log email info on success
    res.status(200).send({ message: 'Password reset link sent' });
  });
});

// Reset password
app.post('/api/reset-password/:token', (req, res) => {
  const { token } = req.params;
  const { password } = req.body;

  // Verify token
  jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    if (err) {
      return res.status(400).send('Invalid or expired token');
    }

    const user = users.find(user => user.email === decoded.email);

    if (!user || user.resetToken !== token || user.resetTokenExpiry < Date.now()) {
      return res.status(400).send('Token has expired or is invalid');
    }

    // Update password (in a real app, hash the password before saving it)
    user.password = password;
    user.resetToken = undefined; // Clear the reset token after successful reset

    res.status(200).send('Password has been reset successfully');
  });
});

// Start the server
app.listen(4000, () => console.log('Server running on port 4000'));
