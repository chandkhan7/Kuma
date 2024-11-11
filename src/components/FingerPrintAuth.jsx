import React, { useState } from 'react';
import TouchID from 'react-native-touch-id';  // For React Native

const FingerprintAuth = () => {
  const [authenticated, setAuthenticated] = useState(false);

  const handleFingerprintScan = () => {
    TouchID.authenticate('Scan your fingerprint to continue')
      .then(() => {
        setAuthenticated(true);
        alert('Authenticated!');
      })
      .catch(() => {
        alert('Fingerprint authentication failed.');
      });
  };

  return (
    <div>
      <h2>Fingerprint Authentication</h2>
      <button onClick={handleFingerprintScan}>
        Scan Fingerprint
      </button>
      {authenticated && <p>Authenticated successfully!</p>}
    </div>
  );
};

export default FingerprintAuth;
