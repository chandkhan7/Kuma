import React, { useState, useEffect } from 'react';
import AttendanceGrid from './AttendanceGrid';

const Profile = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('user'));
    if (user) setUsers([user]);
  }, []);

  return (
    <div>
      <h2>Profile</h2>
      <AttendanceGrid users={users} />
    </div>
  );
};

export default Profile;
