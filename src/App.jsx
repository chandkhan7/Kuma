import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Home from './components/home/Home';
import Profile from './components/profile/Profile';
import Signup from './components/Signup';
import Login from './components/Login';
import { FaUserCircle, FaHome, FaPlusCircle, FaCog } from 'react-icons/fa';
import 'bootstrap/dist/css/bootstrap.min.css';
import './styles/App.css';

function App() {
  const [posts, setPosts] = useState([]);
  const [showSettings, setShowSettings] = useState(false);

  useEffect(() => {
    const savedPosts = JSON.parse(localStorage.getItem('posts')) || [];
    setPosts(savedPosts);
  }, []);

  const addPost = (newPost) => {
    const updatedPosts = [...posts, newPost];
    setPosts(updatedPosts);
    localStorage.setItem('posts', JSON.stringify(updatedPosts));
  };

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

  const toggleSettings = () => {
    setShowSettings(!showSettings);
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

          {/* Settings Dropdown */}
          <div className="nav-item position-relative text-white">
            <FaCog size={30} onClick={toggleSettings} style={{ cursor: 'pointer' }} />
            {showSettings && (
              <div className="dropdown-menu dropdown-menu-right show p-2" style={{ position: 'absolute', bottom: '40px', right: '0' }}>
                <Link to="/login" className="dropdown-item">Login</Link>
                <Link to="/signup" className="dropdown-item">Create Account</Link>
              </div>
            )}
          </div>
        </div>

        {/* Define Routes */}
        <Routes>
          <Route path="/" element={<Home posts={posts} />} />
          <Route path="/profile" element={<Profile posts={posts} />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Login />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
