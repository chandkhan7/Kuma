// src/components/FingerprintAuthModal.jsx

import React, { useState } from 'react';

const FingerprintAuthModal = ({ isOpen, onClose, onAuthenticate }) => {
  const [error, setError] = useState('');

  // Function to trigger fingerprint scan via WebAuthn
  const handleFingerprintScan = async () => {
    try {
      const publicKey = {
        // Challenge to ensure this is a new request and valid (should come from the server)
        challenge: new Uint8Array([/* some random bytes */]),
        rp: { name: "Your Website" }, // Website info
        user: {
          id: new TextEncoder().encode("user123"),  // User's ID (encode as bytes)
          name: "user@example.com",  // User's name
          displayName: "User Name"
        },
        pubKeyCredParams: [{ type: "public-key", alg: -7 }],  // Supported algorithms (ES256)
      };

      const credential = await navigator.credentials.create({ publicKey });

      // Send credential to your server for validation
      onAuthenticate(credential);
      onClose();  // Close modal on success
    } catch (error) {
      setError("Fingerprint scan failed. Please try again.");
      console.error(error);
    }
  };

  return (
    <div>
      <h2>Fingerprint Authentication</h2>
      <p>To continue, please scan your fingerprint.</p>
      <button onClick={handleFingerprintScan} className="btn btn-primary">
        Scan Fingerprint
      </button>
      {error && <div className="alert alert-danger">{error}</div>}
      <button onClick={onClose} className="btn btn-secondary ml-2">Cancel</button>
    </div>
  );
};

export default FingerprintAuthModal;
