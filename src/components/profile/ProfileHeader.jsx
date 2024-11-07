import React, { useState, useEffect, useRef } from 'react';
import { FaRegNewspaper, FaHeart, FaComment, FaShareAlt, FaPlus } from 'react-icons/fa';
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
  const [shadowPic, setShadowPic] = useState(user.shadowPic || '');
  const [posts, setPosts] = useState([
    { id: 1, imageUrl: "https://cdn.shopify.com/s/files/1/1199/8502/files/persian-doll-face.jpg", likes: 200, comments: 50, shares: 10 },
    { id: 2, imageUrl: "https://i0.wp.com/www.sciencenews.org/wp-content/uploads/2023/06/062623_CG_Megalodon_feat.jpg?fit=1030%2C580&ssl=1", likes: 150, comments: 30, shares: 5 },
    { id: 3, imageUrl: "https://www.economist.com/cdn-cgi/image/width=1424,quality=80,format=auto/content-assets/images/20230923_CUP002.jpg", likes: 350, comments: 80, shares: 20 }
  ]);
  const [postCount, setPostCount] = useState(posts.length);
  const [selectedPost, setSelectedPost] = useState(null);
  const fileInputRef = useRef(null);
  const shadowFileInputRef = useRef(null);

  useEffect(() => {
    const savedProfileData = JSON.parse(localStorage.getItem('profileData'));
    if (savedProfileData) {
      setUsername(savedProfileData.username || user.username);
      setBio(savedProfileData.bio || user.bio);
      setProfilePic(savedProfileData.profilePic || profileImage);
      setName(savedProfileData.name || user.name);
      setIsInRelationship(savedProfileData.relationshipStatus || user.relationshipStatus || false);
      setIsHappy(savedProfileData.happyStatus || user.happyStatus || false);
      setShadowPic(savedProfileData.shadowPic || '');
    }
  }, [user]);

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

  const handleCancelEdit = () => {
    setUsername(user.username);
    setBio(user.bio);
    setProfilePic(user.profilePic || profileImage);
    setName(user.name || "User's Name");
    setIsInRelationship(user.relationshipStatus || false);
    setIsHappy(user.happyStatus || false);
    setShadowPic(user.shadowPic || '');
    setIsEditing(false);
  };

  const handleProfilePicClick = () => {
    setProfilePic(prevPic => prevPic === profileImage ? profilePic : profileImage);
  };

  const handleProfilePicChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const newProfilePic = URL.createObjectURL(file);
      setProfilePic(newProfilePic);
    }
  };

  const handleShadowPicChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const newShadowPic = URL.createObjectURL(file);
      setShadowPic(newShadowPic);
    }
  };

  const toggleRelationshipStatus = () => {
    setIsInRelationship(!isInRelationship);
  };

  const toggleHappyStatus = () => {
    setIsHappy(!isHappy);
  };

  const handleLike = (postId) => {
    setPosts(posts.map(post => post.id === postId ? { ...post, likes: post.likes + 1 } : post));
  };

  const handleComment = (postId) => {
    setPosts(posts.map(post => post.id === postId ? { ...post, comments: post.comments + 1 } : post));
  };

  const handleShare = (postId) => {
    setPosts(posts.map(post => post.id === postId ? { ...post, shares: post.shares + 1 } : post));
  };

  const handlePostClick = (postId) => {
    const post = posts.find(p => p.id === postId);
    setSelectedPost(post);
  };

  const handleClosePostDetail = () => {
    setSelectedPost(null);
  };

  const addNewPost = () => {
    const newPost = {
      id: posts.length + 1,
      imageUrl: "https://via.placeholder.com/300",
      likes: 0,
      comments: 0,
      shares: 0,
    };
    setPosts([...posts, newPost]);
    setPostCount(postCount + 1);
  };

  return (
    <div className="profile">
      <div className="profile-header">
        <div className="profile-picture-container">
          <img
            src={profilePic}
            alt="Profile"
            className={`profile-picture ${profilePic !== profileImage ? 'flipped' : ''}`}
            onClick={handleProfilePicClick}
          />
          {shadowPic && (
            <div 
              className="shadow-profile-picture"
              style={{ backgroundImage: `url(${shadowPic})` }}
            />
          )}
          <button 
            className="add-picture-btn" 
            onClick={() => shadowFileInputRef.current.click()}
          >
            +
          </button>
          <div className="profile-name">
            <h3>{name}</h3>
          </div>
        </div>

        <input
          type="file"
          ref={fileInputRef}
          style={{ display: 'none' }}
          onChange={handleProfilePicChange}
          accept="image/*"
        />

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
              <button 
                type="button"
                className="cancel-btn"
                onClick={handleCancelEdit}
              >
                Cancel
              </button>
            </form>
          ) : (
            <>
              <h2>{username}</h2>
              <p className="bio">{bio}</p>
              <div className="profile-stats">
                <div>
                  <strong>{postCount}</strong> posts
                </div>
                <div>
                  <strong>{user.followers}</strong> followers
                </div>
                <div>
                  <strong>{user.following}</strong> following
                </div>
              </div>
              <button onClick={() => setIsEditing(!isEditing)} className="edit-profile-btn">
                {isEditing ? 'Cancel Edit' : 'Edit Profile'}
              </button>
              <button onClick={addNewPost} className="add-post-btn">
                <FaPlus />
              </button>

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

          <div className="posts-header">
            <FaRegNewspaper className="icon-post" size={30} color="white" />
            <span className="posts-title">MY POSTS            </span>
          </div>

          <div className="profile-posts">
            {posts.map(post => (
              <div key={post.id} className="post-thumbnail" onClick={() => handlePostClick(post.id)}>
                <img
                  src={post.imageUrl}
                  alt="Post"
                  className="post-image"
                />
                <div className="post-details">
                  <div className="like-count">
                    <FaHeart
                      onClick={() => handleLike(post.id)}
                      className="icon-like"
                      size={20}
                      color={post.likes > 0 ? 'red' : 'gray'}
                    />
                    {post.likes} Likes
                  </div>
                  <div className="comment-count">
                    <FaComment
                      onClick={() => handleComment(post.id)}
                      className="icon-comment"
                      size={20}
                      color={post.comments > 0 ? 'blue' : 'gray'}
                    />
                    {post.comments} Comments
                  </div>
                  <div className="share-count">
                    <FaShareAlt
                      onClick={() => handleShare(post.id)}
                      className="icon-share"
                      size={20}
                      color={post.shares > 0 ? 'green' : 'gray'}
                    />
                    {post.shares} Shares
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {selectedPost && (
        <div className="post-detail-modal" onClick={handleClosePostDetail}>
          <div className="post-detail-content" onClick={(e) => e.stopPropagation()}>
            <button className="close-btn" onClick={handleClosePostDetail}>X</button>
            
            <img src={selectedPost.imageUrl} alt="Selected Post" className="post-detail-image" />
            <div className="post-detail-stats">
              <p>{selectedPost.likes} Likes</p>
              <p>{selectedPost.comments} Comments</p>
              <p>{selectedPost.shares} Shares</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProfileHeader;

