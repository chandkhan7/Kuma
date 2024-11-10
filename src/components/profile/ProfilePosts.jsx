import React from 'react';
import '../../styles/posts/Post.css'; // Ensure this path is correct

const ProfilePosts = ({ posts }) => {
  // Check if posts are available and is an array
  if (!posts || posts.length === 0) {
    return <p>No posts available.</p>;
  }

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
