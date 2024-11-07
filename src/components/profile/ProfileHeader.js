import React, { useState, useEffect, useRef } from 'react';
import profileImage from '../../assets/mark.jpg';
import '../../styles/profile/Profile.css';

const ProfileHeader = ({ user }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [username, setUsername] = useState(user.username);
  const [bio, setBio] = useState(user.bio);
  const [profilePic, setProfilePic] = useState(profileImage);
  const [name, setName] = useState(user.name || ""); // New state for name
  const [isInRelationship, setIsInRelationship] = useState(user.relationshipStatus || false); // Relationship status state
  const [isHappy, setIsHappy] = useState(user.happyStatus || false); // Happy or Sad state
  const fileInputRef = useRef(null);

  useEffect(() => {
    const savedProfileData = JSON.parse(localStorage.getItem('profileData'));
    if (savedProfileData) {
      setUsername(savedProfileData.username || user.username);
      setBio(savedProfileData.bio || user.bio);
      setProfilePic(savedProfileData.profilePic || profileImage);
      setName(savedProfileData.name || user.name);
      setIsInRelationship(savedProfileData.relationshipStatus || user.relationshipStatus || false);
      setIsHappy(savedProfileData.happyStatus || user.happyStatus || false);
    }
  }, [user.username, user.bio, user.name, profileImage, user.relationshipStatus, user.happyStatus]);

  const handleProfileUpdate = (e) => {
    e.preventDefault();
    const updatedProfile = { username, bio, profilePic, name, relationshipStatus: isInRelationship, happyStatus: isHappy };
    localStorage.setItem('profileData', JSON.stringify(updatedProfile));
    setIsEditing(false);
  };

  const handleProfilePicClick = () => {
    fileInputRef.current.click();
  };

  const handleProfilePicChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const newProfilePic = URL.createObjectURL(file);
      setProfilePic(newProfilePic);
      const updatedProfile = { username, bio, profilePic: newProfilePic, name, relationshipStatus: isInRelationship, happyStatus: isHappy };
      localStorage.setItem('profileData', JSON.stringify(updatedProfile));
    }
  };

  const toggleRelationshipStatus = () => {
    setIsInRelationship(!isInRelationship);
    const updatedProfile = { username, bio, profilePic, name, relationshipStatus: !isInRelationship, happyStatus: isHappy };
    localStorage.setItem('profileData', JSON.stringify(updatedProfile));
  };

  const toggleHappyStatus = () => {
    setIsHappy(!isHappy);
    const updatedProfile = { username, bio, profilePic, name, relationshipStatus: isInRelationship, happyStatus: !isHappy };
    localStorage.setItem('profileData', JSON.stringify(updatedProfile));
  };

  return (
    <div className="profile-header">
      {/* Profile Picture with Circular Shape */}
      <div className="profile-picture-container">
        <img
          src={profilePic}
          alt="Profile"
          className="profile-picture"
          onClick={handleProfilePicClick}
        />
        <span className="profile-name">{name}</span> {/* Display name around the profile picture */}
      </div>

      <input
        type="file"
        ref={fileInputRef}
        style={{ display: 'none' }}
        onChange={handleProfilePicChange}
        accept="image/*"
      />

      <div className="profile-info">
        {isEditing ? (
          <form onSubmit={handleProfileUpdate}>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="input-field"
              placeholder="Edit name"
            />
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
            <button onClick={() => setIsEditing(!isEditing)} className="edit-profile-btn">
              {isEditing ? 'Cancel' : 'Edit Profile'}
            </button>

            {/* Relationship Status Toggle */}
            <label className="switch">
              <input
                type="checkbox"
                checked={isInRelationship}
                onChange={toggleRelationshipStatus}
              />
              <span className="slider round"></span>
            </label>
            <p className="relationship-status">
              {isInRelationship ? 'In a Relationship' : 'Single'}
            </p>

            {/* Happy/Sad Toggle */}
            <label className="switch">
              <input
                type="checkbox"
                checked={isHappy}
                onChange={toggleHappyStatus}
              />
              <span className="slider round"></span>
            </label>
            <p className="happy-status">
              {isHappy ? 'Happy' : 'Sad'}
            </p>
          </>
        )}
      </div>
    </div>
  );
};

export default ProfileHeader;
