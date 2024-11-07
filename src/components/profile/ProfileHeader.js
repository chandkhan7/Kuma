import React, { useState, useEffect, useRef } from 'react';
import profileImage from '../../assets/mark.jpg';
import '../../styles/profile/Profile.css';

const ProfileHeader = ({ user }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [username, setUsername] = useState(user.username || "");
  const [bio, setBio] = useState(user.bio || "");
  const [profilePic, setProfilePic] = useState(user.profilePic || profileImage);
  const [name, setName] = useState(user.name || "User's Name");
  const [isInRelationship, setIsInRelationship] = useState(user.relationshipStatus || false);
  const [isHappy, setIsHappy] = useState(user.happyStatus || false);
  const [shadowPic, setShadowPic] = useState(user.shadowPic || ''); // Shadow picture state

  const fileInputRef = useRef(null);
  const shadowFileInputRef = useRef(null);

  // UseEffect to load saved profile data from localStorage
  useEffect(() => {
    const savedProfileData = JSON.parse(localStorage.getItem('profileData'));
    if (savedProfileData) {
      setUsername(savedProfileData.username || user.username);
      setBio(savedProfileData.bio || user.bio);
      setProfilePic(savedProfileData.profilePic || profileImage);
      setName(savedProfileData.name || user.name);
      setIsInRelationship(savedProfileData.relationshipStatus || user.relationshipStatus || false);
      setIsHappy(savedProfileData.happyStatus || user.happyStatus || false);
      setShadowPic(savedProfileData.shadowPic || ''); // Load shadow picture if available
    }
  }, [user]);

  // Handle profile updates and save to localStorage
  const handleProfileUpdate = (e) => {
    e.preventDefault();
    const updatedProfile = { 
      username, 
      bio, 
      profilePic, 
      name, 
      relationshipStatus: isInRelationship, 
      happyStatus: isHappy, 
      shadowPic 
    };
    localStorage.setItem('profileData', JSON.stringify(updatedProfile));
    setIsEditing(false);
  };

  // Toggle profile picture between default and uploaded image
  const handleProfilePicClick = () => {
    setProfilePic(prevPic => prevPic === profileImage ? profilePic : profileImage); // Toggle the profile picture for flipping
  };

  // Handle profile picture change
  const handleProfilePicChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const newProfilePic = URL.createObjectURL(file);
      setProfilePic(newProfilePic);
      const updatedProfile = { username, bio, profilePic: newProfilePic, name, relationshipStatus: isInRelationship, happyStatus: isHappy, shadowPic };
      localStorage.setItem('profileData', JSON.stringify(updatedProfile));
    }
  };

  // Handle shadow profile picture change
  const handleShadowPicChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const newShadowPic = URL.createObjectURL(file);
      setShadowPic(newShadowPic);
      const updatedProfile = { username, bio, profilePic, name, relationshipStatus: isInRelationship, happyStatus: isHappy, shadowPic: newShadowPic };
      localStorage.setItem('profileData', JSON.stringify(updatedProfile));
    }
  };

  // Toggle relationship status
  const toggleRelationshipStatus = () => {
    setIsInRelationship(!isInRelationship);
    const updatedProfile = { username, bio, profilePic, name, relationshipStatus: !isInRelationship, happyStatus: isHappy, shadowPic };
    localStorage.setItem('profileData', JSON.stringify(updatedProfile));
  };

  // Toggle happy status
  const toggleHappyStatus = () => {
    setIsHappy(!isHappy);
    const updatedProfile = { username, bio, profilePic, name, relationshipStatus: isInRelationship, happyStatus: !isHappy, shadowPic };
    localStorage.setItem('profileData', JSON.stringify(updatedProfile));
  };

  return (
    <div className="profile">
      <div className="profile-header">
        {/* Profile Picture Section */}
        <div className="profile-picture-container">
          <img
            src={profilePic}
            alt="Profile"
            className={`profile-picture ${profilePic !== profileImage ? 'flipped' : ''}`}
            onClick={handleProfilePicClick}
          />
          
          {/* Shadow Profile Picture */}
          {shadowPic && (
            <div 
              className="shadow-profile-picture"
              style={{ backgroundImage: `url(${shadowPic})` }}
            />
          )}
          
          {/* Add Shadow Profile Picture (plus icon) */}
          <button 
            className="add-picture-btn" 
            onClick={() => shadowFileInputRef.current.click()}
          >
            +
          </button>

          {/* User's Name Below Profile Picture */}
          <div className="profile-name">
            <h3>{name}</h3>
          </div>
        </div>

        {/* Input for profile picture change */}
        <input
          type="file"
          ref={fileInputRef}
          style={{ display: 'none' }}
          onChange={handleProfilePicChange}
          accept="image/*"
        />

        {/* Input for shadow picture change */}
        <input
          type="file"
          ref={shadowFileInputRef}
          style={{ display: 'none' }}
          onChange={handleShadowPicChange}
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
    </div>
  );
};

export default ProfileHeader;
