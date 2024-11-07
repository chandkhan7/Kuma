// src/components/profile/Profile.js
import React, { useState, useEffect } from 'react';
import ProfileHeader from './ProfileHeader'; // Import the ProfileHeader component
import ProfilePosts from './ProfilePosts'; // Import the ProfilePosts component

const Profile = () => {
  const [user, setUser] = useState({
    username: 'chandkhan_ck',
    bio: 'programmer | javascript | Coffee Lover',
    followers: '20M',
    following: 30,
    posts: [
      { id: 1, imageUrl: 'https://i.pinimg.com/736x/d4/00/bb/d400bbf46a1aca6fd3ce638e867913f2.jpg' },
      { id: 2, imageUrl: 'https://www.treehugger.com/thmb/F5G8zaALRp7rvgWqDVT13t9pKY8=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/close-up-of-scarlet-macaw-flying-in-mid-air-634869043-f360b379b8c44a28a052b41d99adc2a7.jpg' },
      { id: 3, imageUrl: 'https://images.pexels.com/photos/1463295/pexels-photo-1463295.jpeg?cs=srgb&dl=pexels-frans-van-heerden-201846-1463295.jpg&fm=jpg' },
      { id: 1, imageUrl: 'https://i.pinimg.com/736x/d4/00/bb/d400bbf46a1aca6fd3ce638e867913f2.jpg' },
      { id: 2, imageUrl: 'https://www.treehugger.com/thmb/F5G8zaALRp7rvgWqDVT13t9pKY8=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/close-up-of-scarlet-macaw-flying-in-mid-air-634869043-f360b379b8c44a28a052b41d99adc2a7.jpg' },
      { id: 3, imageUrl: 'https://images.pexels.com/photos/1463295/pexels-photo-1463295.jpeg?cs=srgb&dl=pexels-frans-van-heerden-201846-1463295.jpg&fm=jpg' },
      { id: 1, imageUrl: 'https://i.pinimg.com/736x/d4/00/bb/d400bbf46a1aca6fd3ce638e867913f2.jpg' },
      { id: 2, imageUrl: 'https://www.treehugger.com/thmb/F5G8zaALRp7rvgWqDVT13t9pKY8=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/close-up-of-scarlet-macaw-flying-in-mid-air-634869043-f360b379b8c44a28a052b41d99adc2a7.jpg' },
      { id: 3, imageUrl: 'https://images.pexels.com/photos/1463295/pexels-photo-1463295.jpeg?cs=srgb&dl=pexels-frans-van-heerden-201846-1463295.jpg&fm=jpg' },
      { id: 1, imageUrl: 'https://i.pinimg.com/736x/d4/00/bb/d400bbf46a1aca6fd3ce638e867913f2.jpg' },
      { id: 2, imageUrl: 'https://www.treehugger.com/thmb/F5G8zaALRp7rvgWqDVT13t9pKY8=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/close-up-of-scarlet-macaw-flying-in-mid-air-634869043-f360b379b8c44a28a052b41d99adc2a7.jpg' },
      { id: 3, imageUrl: 'https://images.pexels.com/photos/1463295/pexels-photo-1463295.jpeg?cs=srgb&dl=pexels-frans-van-heerden-201846-1463295.jpg&fm=jpg' },
      { id: 1, imageUrl: 'https://i.pinimg.com/736x/d4/00/bb/d400bbf46a1aca6fd3ce638e867913f2.jpg' },
      { id: 2, imageUrl: 'https://www.treehugger.com/thmb/F5G8zaALRp7rvgWqDVT13t9pKY8=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/close-up-of-scarlet-macaw-flying-in-mid-air-634869043-f360b379b8c44a28a052b41d99adc2a7.jpg' },
      { id: 3, imageUrl: 'https://images.pexels.com/photos/1463295/pexels-photo-1463295.jpeg?cs=srgb&dl=pexels-frans-van-heerden-201846-1463295.jpg&fm=jpg' },
      { id: 1, imageUrl: 'https://i.pinimg.com/736x/d4/00/bb/d400bbf46a1aca6fd3ce638e867913f2.jpg' },
      { id: 2, imageUrl: 'https://www.treehugger.com/thmb/F5G8zaALRp7rvgWqDVT13t9pKY8=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/close-up-of-scarlet-macaw-flying-in-mid-air-634869043-f360b379b8c44a28a052b41d99adc2a7.jpg' },
      { id: 3, imageUrl: 'https://images.pexels.com/photos/1463295/pexels-photo-1463295.jpeg?cs=srgb&dl=pexels-frans-van-heerden-201846-1463295.jpg&fm=jpg' },
    ],
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
