const express = require('express');
const Fido2Lib = require('fido2-lib');
const nodemailer = require('nodemailer');
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
const cors = require('cors'); // CORS for cross-origin requests

dotenv.config();

const app = express();
app.use(express.json());
app.use(cors()); // Enable CORS for all origins (you can customize it if needed)

const port = 5000; // Change port to 5000
const fido2 = new Fido2Lib();

// Mock data for users and attendance (replace with real DB)
const users = [];
const RESET_PASSWORD_EXPIRY = 3600000; // 1 hour expiration time for reset token

// Email Transporter configuration
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
  tls: {
    rejectUnauthorized: false, // To avoid SSL/TLS issues
  },
});

// Route to generate WebAuthn challenge
app.post('/generate-challenge', async (req, res) => {
  try {
    const userId = req.body.userId || 'user123'; // Replace with actual user data
    const challenge = await fido2.attestationOptions();

    challenge.user = {
      id: new TextEncoder().encode(userId), // Encode the user ID as bytes
      name: "user@example.com", // User's email or username
      displayName: "User Name",
    };

    res.json(challenge); // Send the challenge to the frontend
  } catch (error) {
    res.status(500).json({ error: 'Failed to generate challenge' });
  }
});

// Route to verify fingerprint data
app.post('/verify-fingerprint', async (req, res) => {
  const { fingerprintData } = req.body;

  // Log fingerprint data for debugging
  console.log('Received fingerprint data:', fingerprintData);

  // Replace with actual WebAuthn signature verification logic
  const isVerified = verifyFingerprint(fingerprintData);

  if (isVerified) {
    res.status(200).json({ success: true });
  } else {
    res.status(401).json({ success: false, message: 'Fingerprint verification failed' });
  }
});

// Function to mock fingerprint verification (replace with real WebAuthn verification)
function verifyFingerprint(fingerprintData) {
  // For now, this is just a placeholder, you would use WebAuthn's API to verify the fingerprint
  // In a real-world case, the fingerprint data is signed using a private key and we need to verify it using the public key
  const storedFingerprintData = getStoredFingerprintData(); // Get stored fingerprint data from DB

  return storedFingerprintData === fingerprintData; // Mock comparison
}

function getStoredFingerprintData() {
  // Mock: In a real application, this would be retrieved from a database
  return "sample-stored-fingerprint-data"; // Placeholder for mock data
}

// Mock route to send reset password link (useful for demo purposes)
app.post('/api/send-reset-link', (req, res) => {
  const { email } = req.body;
  const user = users.find(user => user.email === email);
  
  if (!user) {
    return res.status(404).send('User not found');
  }

  // Generate reset token and expiration time
  const token = jwt.sign({ email }, process.env.JWT_SECRET, { expiresIn: '1h' });

  // Store the token in the user record (in a real app, store it in the DB)
  user.resetToken = token;
  user.resetTokenExpiry = Date.now() + RESET_PASSWORD_EXPIRY;

  // Send reset link via email
  const resetLink = `http://localhost:5000/reset-password/${token}`;  // Adjust the URL based on your frontend
  const mailOptions = {
    to: email,
    subject: 'Password Reset',
    text: `Click the following link to reset your password: ${resetLink}`,
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.error('Error sending email:', error);
      return res.status(500).send({ message: 'Error sending reset link' });
    }
    console.log('Email sent: ' + info.response);
    res.status(200).send({ message: 'Password reset link sent' });
  });
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
