// /server/controllers/authController.js

const jwt = require('jsonwebtoken');
const { findUserByEmail, updateUser } = require('../models/userModel');
const { sendEmail } = require('../utils/emailSender');

// Send the reset password link
const sendResetLink = async (req, res) => {
  const { email } = req.body;
  const user = findUserByEmail(email);

  if (!user) {
    return res.status(404).send('User not found');
  }

  const token = jwt.sign({ email: user.email }, process.env.JWT_SECRET, { expiresIn: '1h' });
  const resetLink = `http://localhost:3000/reset-password/${token}`;

  // Save the token in the user record (in-memory for now)
  updateUser(email, { resetToken: token, resetTokenExpiry: Date.now() + 3600000 });  // Token expires in 1 hour

  const emailSubject = 'Password Reset Link';
  const emailText = `Click the link below to reset your password: ${resetLink}`;

  try {
    await sendEmail(email, emailSubject, emailText);
    res.status(200).send('Password reset link sent');
  } catch (error) {
    res.status(500).send('Error sending email');
  }
};

// Reset password after user clicks the link
const resetPassword = (req, res) => {
  const { token } = req.params;
  const { password } = req.body;

  jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    if (err) {
      return res.status(400).send('Invalid or expired token');
    }

    const user = findUserByEmail(decoded.email);
    if (!user || user.resetToken !== token || user.resetTokenExpiry < Date.now()) {
      return res.status(400).send('Token has expired or is invalid');
    }

    // Update user password
    updateUser(decoded.email, { password, resetToken: null, resetTokenExpiry: null });

    res.status(200).send('Password has been successfully reset');
  });
};

module.exports = {
  sendResetLink,
  resetPassword,
};
