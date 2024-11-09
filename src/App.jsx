import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Home from './components/home/Home';
import Profile from './components/profile/Profile';
import Signup from './components/Signup';
import Login from './components/Login'; // Import Login Component
import { FaUserCircle, FaHome, FaPlusCircle, FaCog } from 'react-icons/fa'; // Add FaCog for settings
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
          <div className="nav-item dropdown">
            <FaCog size={30} data-bs-toggle="dropdown" aria-expanded="false" />
            <ul className="dropdown-menu">
              <li>
                <Link to="/signup" className="dropdown-item">Create Account</Link>
              </li>
              {/* Add more settings options here if needed */}
            </ul>
          </div>
        </div>

        {/* Define Routes */}
        <Routes>
          <Route path="/" element={<Home posts={posts} />} /> {/* Home with posts */}
          <Route path="/profile" element={<Profile posts={posts} />} /> {/* Profile with posts */}
          <Route path="/signup" element={<Signup />} /> {/* Signup page */}
          <Route path="/login" element={<Login />} /> {/* Login page */}
        </Routes>
      </div>
    </Router>
  );
}

export default App;
