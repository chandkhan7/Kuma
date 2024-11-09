// src/components/home/Home.jsx
import React from 'react';

const Home = ({ posts }) => {
  return (
    <div className="home">
      {posts.map((post, index) => (
        <div key={index} className="post">
          <img src={post.imageUrl} alt="User Post" className="post-image" />
          <p>{post.caption}</p>
          <div className="post-actions">
            <span>{post.likes} Likes</span>
            <span>{post.comments.length} Comments</span>
            <span>{post.shares} Shares</span>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Home;
