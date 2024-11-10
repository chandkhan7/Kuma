// src/components/Attendance.jsx
import React, { useEffect, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { FaFingerprint } from 'react-icons/fa'; // Import fingerprint icon
import './Attendance.css';

const Attendance = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    // Retrieve the logged-in user's data from localStorage
    const storedUser = JSON.parse(localStorage.getItem('user'));
    if (storedUser) {
      setUser(storedUser);
    }
  }, []);

  if (!user) {
    return <p className="text-center mt-5">No user is logged in.</p>;
  }

  return (
    <div className="attendance-container">
      <h3 className="text-center">Attendance Sheet</h3>
      <table className="table table-bordered mt-3">
        <thead>
          <tr>
            <th>Enrollment Number</th>
            <th>Name</th>
            <th>Attendance</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>{user.enrollmentNumber}</td>
            <td>{user.name}</td>
            <td className="text-center">
              <FaFingerprint size={24} /> {/* Fingerprint icon for attendance */}
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default Attendance;
