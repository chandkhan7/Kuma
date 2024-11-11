// src/components/Profile.jsx
import React, { useState } from 'react';
import FingerprintAuthModal from './FingerprintAuthModal';
import { FaFingerprint } from 'react-icons/fa';  // Importing Font Awesome Fingerprint Icon

const Profile = () => {
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [authenticated, setAuthenticated] = useState(false);

  // Handle Fingerprint Icon click
  const handleFingerprintClick = () => {
    setModalIsOpen(true);
  };

  // Handle authentication success
  const handleAuthentication = (username, enrollmentNumber) => {
    // Store username and enrollment number in localStorage or state
    localStorage.setItem('username', username);
    localStorage.setItem('enrollmentNumber', enrollmentNumber);
    setAuthenticated(true);
    alert('Authenticated successfully!');
  };

  return (
    <div className="profile-container">
      <h2>User Profile</h2>
      
      {!authenticated ? (
        <div>
          <p>Your profile is locked. Please authenticate to access details.</p>
          <button 
            className="btn btn-light" 
            onClick={handleFingerprintClick} 
            title="Authenticate with Fingerprint"
          >
            <FaFingerprint size={30} /> Fingerprint Authentication
          </button>
        </div>
      ) : (
        <div>
          <h4>Welcome, {localStorage.getItem('username')}</h4>
          <p>Enrollment Number: {localStorage.getItem('enrollmentNumber')}</p>
        </div>
      )}

      {/* Fingerprint Authentication Modal */}
      <FingerprintAuthModal 
        isOpen={modalIsOpen} 
        onClose={() => setModalIsOpen(false)} 
        onAuthenticate={handleAuthentication} 
      />
    </div>
  );
};

export default Profile;
