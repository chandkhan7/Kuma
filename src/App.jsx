// src/App.jsx
import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Home from './components/home/Home';
import Profile from './components/profile/Profile';
import { FaUserCircle, FaHome, FaPlusCircle } from 'react-icons/fa';
import './styles/App.css';

function App() {
  const [posts, setPosts] = useState([]);

  // Load posts from localStorage on component mount
  useEffect(() => {
    const savedPosts = JSON.parse(localStorage.getItem('posts')) || [];
    setPosts(savedPosts);
  }, []);

  // Add post to state and save to localStorage
  const addPost = (newPost) => {
    const updatedPosts = [...posts, newPost];
    setPosts(updatedPosts);
    localStorage.setItem('posts', JSON.stringify(updatedPosts));
  };

  // Handle file input to add a post with image and caption
  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const caption = prompt("Enter caption:");
        const newPost = {
          imageUrl: e.target.result,
          caption: caption || 'New post!',
          likes: 0,
          comments: [],
          shares: 0
        };
        addPost(newPost);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <Router>
      <div className="App">
        {/* Bottom Navbar for mobile view */}
        <div className="bottom-navbar">
          <Link to="/" className="nav-item">
            <FaHome size={30} />
          </Link>
          <label className="nav-item post-button">
            <FaPlusCircle size={30} />
            <input type="file" onChange={handleFileChange} style={{ display: 'none' }} />
          </label>
          <Link to="/profile" className="nav-item">
            <FaUserCircle size={30} />
          </Link>
        </div>

        {/* Define Routes */}
        <Routes>
          <Route path="/" element={<Home posts={posts} />} /> {/* Home with posts */}
          <Route path="/profile" element={<Profile posts={posts} />} /> {/* Profile with posts */}
        </Routes>
      </div>
    </Router>
  );
}

export default App;
