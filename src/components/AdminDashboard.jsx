// AdminDashboard.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';

const AdminDashboard = () => {
  const [userRequests, setUserRequests] = useState([]);

  useEffect(() => {
    // Fetch user attendance requests from the server
    axios.get('/api/user-requests')
      .then(response => setUserRequests(response.data))
      .catch(error => console.log(error));
  }, []);

  const handleApproval = (userId, ipAddress, status) => {
    axios.post('/approve-attendance', { userId, ipAddress, status })
      .then(response => alert(response.data.message))
      .catch(error => alert('Error approving attendance'));
  };

  return (
    <div>
      <h3>User Attendance Requests</h3>
      <ul>
        {userRequests.map((request, idx) => (
          <li key={idx}>
            {request.userId} - {request.ipAddress}
            <button onClick={() => handleApproval(request.userId, request.ipAddress, true)}>Approve</button>
            <button onClick={() => handleApproval(request.userId, request.ipAddress, false)}>Deny</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default AdminDashboard;
