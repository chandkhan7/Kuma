// src/components/profile/Profile.js
import React, { useState, useEffect } from 'react';
import ProfileHeader from './ProfileHeader'; // Import the ProfileHeader component
import ProfilePosts from './ProfilePosts'; // Import the ProfilePosts component

const Profile = () => {
  const [user, setUser] = useState({
    username: 'chandkhan_ck',
    followers: '20M',
    following: 30,
    bio: 'programmer | javascript | Coffee Lover',
    posts: [
    ]
  });

  useEffect(() => {
    // Fetch and set user data here
  }, []);

  return (
    <div className="profile">
      <ProfileHeader user={user} /> {/* Pass user data to ProfileHeader */}
      <ProfilePosts posts={user.posts} /> {/* Pass posts data to ProfilePosts */}
    </div>
  );
};

export default Profile;
