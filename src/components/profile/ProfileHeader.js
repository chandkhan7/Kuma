import React, { useState } from 'react';
import profileImage from '../../assets/mark.jpg'; // Path to profile image in assets
import '../../styles/profile/Profile.css'; // Path to Profile.css in the profile folder



const ProfileHeader = ({ user }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [username, setUsername] = useState(user.username);
  const [bio, setBio] = useState(user.bio);
  const [profilePic, setProfilePic] = useState(profileImage);

  // Handle profile update
  const handleProfileUpdate = (e) => {
    e.preventDefault();
    // You can implement logic here to send the updated data to the server if needed.
    alert('Profile updated successfully');
    setIsEditing(false);
  };

  // Toggle edit mode
  const handleEditClick = () => {
    setIsEditing(!isEditing);
  };

  return (
    <div className="profile-header">
      {/* Profile Picture with Circular Shape */}
      <img src={profilePic} alt="Profile" className="profile-picture" />

      <div className="profile-info">
        {isEditing ? (
          <form onSubmit={handleProfileUpdate}>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="input-field"
              placeholder="Edit username"
            />
            <textarea
              value={bio}
              onChange={(e) => setBio(e.target.value)}
              className="input-field"
              placeholder="Edit bio"
            />
            <input
              type="file"
              onChange={(e) => {
                const file = e.target.files[0];
                if (file) {
                  setProfilePic(URL.createObjectURL(file));
                }
              }}
              className="input-field"
            />
            <button type="submit" className="save-btn">Save</button>
          </form>
        ) : (
          <>
            <h2>{username}</h2>
            <p className="bio">{bio}</p>
            <div className="profile-stats">
              <div>
                <strong>{user.posts.length}</strong> posts
              </div>
              <div>
                <strong>{user.followers}</strong> followers
              </div>
              <div>
                <strong>{user.following}</strong> following
              </div>
            </div>
            <button onClick={handleEditClick} className="edit-profile-btn">
              {isEditing ? 'Cancel' : 'Edit Profile'}
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default ProfileHeader;
