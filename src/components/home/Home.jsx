import React, { useState } from 'react';
import { FaEllipsisV, FaHeart, FaComment, FaShare } from 'react-icons/fa';
import '../../styles/home/Home.css';

const Home = ({ posts, setPosts }) => {
  const [selectedPostIndex, setSelectedPostIndex] = useState(null);

  const handleDelete = (index) => {
    const updatedPosts = posts.filter((_, i) => i !== index);
    setPosts(updatedPosts);
    localStorage.setItem('posts', JSON.stringify(updatedPosts));
    setSelectedPostIndex(null);
  };

  const toggleMenu = (index) => {
    setSelectedPostIndex(selectedPostIndex === index ? null : index);
  };

  const handleDoubleTap = (index) => {
    const updatedPosts = [...posts];
    const post = updatedPosts[index];
    // Toggle like status on double-tap
    post.liked = !post.liked;
    post.likes = post.liked ? post.likes + 1 : post.likes - 1;
    setPosts(updatedPosts);
    localStorage.setItem('posts', JSON.stringify(updatedPosts));
  };

  return (
    <div className="home">
      {posts.map((post, index) => (
        <div key={index} className="post">
          {/* Post Header */}
          <div className="post-header">
            <span className="post-menu-icon" onClick={() => toggleMenu(index)}>
              <FaEllipsisV size={18} />
            </span>
            {selectedPostIndex === index && (
              <div className="post-options">
                <button onClick={() => handleDelete(index)} className="delete-btn">
                  Delete
                </button>
              </div>
            )}
          </div>

          {/* Post Image with Double Tap to Like */}
          <div className="post-image-container" onDoubleClick={() => handleDoubleTap(index)}>
            <img src={post.imageUrl} alt="User Post" className="post-image" />
          </div>

          {/* Post Actions */}
          <div className="post-actions">
            <span 
              className="post-action-item" 
              onClick={() => handleDoubleTap(index)} // Make the heart interactive
            >
              <FaHeart size={20} color={post.liked ? 'red' : '#333'} /> {/* Dark color for the heart */}
              {post.likes}
            </span>
            <span className="post-action-item">
              <FaComment size={20} color="#333" /> {/* Dark color for the comment icon */}
              {post.comments.length}
            </span>
            <span className="post-action-item">
              <FaShare size={20} color="#333" /> {/* Dark color for the share icon */}
              {post.shares}
            </span>
          </div>

          {/* Caption */}
          <p className="post-caption">{post.caption}</p>
        </div>
      ))}
    </div>
  );
};

export default Home;
