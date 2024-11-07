// src/components/profile/ProfilePosts.js
import React from 'react';
import '../../styles/posts/Post.css'; // Path to Post.css in the posts folder

const ProfilePosts = ({ posts }) => {
  return (
    <div className="profile-posts">
      {posts.map((post) => (
        <div key={post.id} className="post-thumbnail">
          <img src={post.imageUrl} alt={`Post ${post.id}`} />
        </div>
      ))}
    </div>
  );
};

export default ProfilePosts;
