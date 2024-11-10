// src/components/FingerprintAuthentication.jsx
import React, { useState } from 'react';
import FingerprintJS from '@fingerprintjs/fingerprintjs';
import axios from 'axios';

const FingerprintAuthentication = () => {
  const [attendanceStatus, setAttendanceStatus] = useState('');

  // Function to get the fingerprint data
  const getFingerprint = async () => {
    const fp = await FingerprintJS.load(); // Load FingerprintJS library
    const result = await fp.get(); // Get unique visitor ID (fingerprint)
    return result.visitorId; // Return the unique visitor ID (fingerprint hash)
  };

  // Function to handle fingerprint scan and attendance marking
  const handleFingerprintScan = async () => {
    try {
      const fpData = await getFingerprint(); // Get fingerprint data

      // Send fingerprint data to the backend for attendance verification
      const response = await axios.post('/mark-attendance', {
        userId: 'user123', // Replace with dynamic user ID
        fingerprintData: fpData, // Send fingerprint data for verification
      });

      setAttendanceStatus('Attendance marked successfully');
    } catch (error) {
      setAttendanceStatus('Fingerprint verification failed');
    }
  };

  return (
    <div>
      <button onClick={handleFingerprintScan} className="btn btn-outline-light">
        <i className="fas fa-fingerprint"></i> Verify Attendance
      </button>
      <p>{attendanceStatus}</p>
    </div>
  );
};

export default FingerprintAuthentication;
