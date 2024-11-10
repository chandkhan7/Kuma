import React, { useState, useEffect } from 'react';
import ProfileHeader from './ProfileHeader'; // Import the ProfileHeader component
import ProfilePosts from './ProfilePosts'; // Import the ProfilePosts component

const Profile = () => {
  const [user, setUser] = useState(null); // Initially set user to null until data is fetched

  useEffect(() => {
    // Fetch user data from localStorage when the component mounts
    const storedUser = JSON.parse(localStorage.getItem('user'));
    if (storedUser) {
      setUser(storedUser); // Set user data from localStorage if available
    }
  }, []);

  if (!user) {
    return <div>Please log in to view your profile.</div>; // Show a message if user data is not found
  }

  return (
    <div className="profile">
      <ProfileHeader user={user} /> {/* Pass user data to ProfileHeader */}
      <ProfilePosts posts={user.posts} /> {/* Pass posts data to ProfilePosts */}
    </div>
  );
};

export default Profile;
