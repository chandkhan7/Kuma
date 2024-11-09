// src/App.js
import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Home from './components/home/Home';
import Profile from './components/profile/Profile';
import Signup from './components/Signup';
import Login from './components/Login';
import { FaUserCircle, FaHome, FaPlusCircle, FaCommentAlt } from 'react-icons/fa'; // FontAwesome Icons
import 'bootstrap/dist/css/bootstrap.min.css';
import './styles/App.css';
import Settings from './components/Settings';
import Messenger from './components/Messenger'; // Import Messenger Component
import ChatRoom from './components/Chatroom/ChatRoom'; // Import ChatRoom Component

function App() {
  const [posts, setPosts] = useState([]);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    // Load posts from localStorage on page load
    const savedPosts = JSON.parse(localStorage.getItem('posts')) || [];
    setPosts(savedPosts);

    // Check if user is logged in from localStorage
    const loggedInStatus = JSON.parse(localStorage.getItem('isLoggedIn')) || false;
    setIsLoggedIn(loggedInStatus);
  }, []);

  // Function to add a post
  const addPost = (newPost) => {
    const updatedPosts = [...posts, newPost];
    setPosts(updatedPosts);
    localStorage.setItem('posts', JSON.stringify(updatedPosts)); // Persist posts to localStorage
  };

  // Handle file input to upload post images
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
          shares: 0,
        };
        addPost(newPost);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <Router>
      <div className="App">
        {/* Bottom Navbar */}
        <div className="bottom-navbar d-flex justify-content-around align-items-center fixed-bottom bg-dark py-2 border-top border-secondary">
          <Link to="/" className="nav-item text-white">
            <FaHome size={30} />
          </Link>
          <label className="nav-item text-white">
            <FaPlusCircle size={30} />
            <input type="file" onChange={handleFileChange} style={{ display: 'none' }} />
          </label>
          <Link to="/profile" className="nav-item text-white">
            <FaUserCircle size={30} />
          </Link>
          <Link to="/messenger" className="nav-item text-white">
            <FaCommentAlt size={30} /> {/* Messenger Icon */}
          </Link>
          <Settings isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} />
        </div>

        {/* Define Routes */}
        <Routes>
          <Route path="/" element={<Home posts={posts} />} />
          <Route path="/profile" element={<Profile posts={posts} />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Login />} />
          <Route path="/messenger" element={<Messenger />} /> {/* Messenger route */}
          <Route path="/chat" element={<ChatRoom />} /> {/* Chat room route */}
        </Routes>
      </div>
    </Router>
  );
}

export default App;
