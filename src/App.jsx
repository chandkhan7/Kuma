// src/App.jsx
import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Link, useLocation } from 'react-router-dom';
import Home from './components/home/Home';
import Profile from './components/profile/Profile';
import Signup from './components/Signup';
import Login from './components/Login';
import ForgotPassword from './components/ForgotPassword';
import FingerprintAuthentication from './components/FingerprintAuthentication';
import Attendance from './components/Attendance';
import Messenger from './components/Messenger';
import ChatRoom from './components/Chatroom/ChatRoom';
import StudentDetails from './components/StudentDetails/StudentDetails';
import Settings from './components/Settings';
import YearSelection from './components/YearSelection'; // Import YearSelection component
import Room from './components/Room';  // Import Room component
import { FaUserCircle, FaHome, FaPlusCircle, FaCommentAlt, FaFingerprint, FaClipboardList } from 'react-icons/fa'; 
import './styles/App.css';
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  const [themeColor, setThemeColor] = useState(localStorage.getItem('themeColor') || 'dark');
  const [posts, setPosts] = useState([]);
  const [isLoggedIn, setIsLoggedIn] = useState(!!localStorage.getItem('user'));
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [previewImage, setPreviewImage] = useState(null);
  const [caption, setCaption] = useState('');
  const [isFingerprintModalOpen, setIsFingerprintModalOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    // Apply the selected theme class to the body element globally
    document.body.className = themeColor;
    localStorage.setItem('themeColor', themeColor); // Store theme in localStorage

    // Load posts and login status from localStorage
    const savedPosts = JSON.parse(localStorage.getItem('posts')) || [];
    setPosts(savedPosts);
    const loggedInStatus = JSON.parse(localStorage.getItem('isLoggedIn')) || false;
    setIsLoggedIn(loggedInStatus);
  }, [themeColor]);

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
        setPreviewImage(e.target.result);
        setIsModalOpen(true);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleConfirmPost = () => {
    const newPost = {
      imageUrl: previewImage,
      caption: caption || 'New post!',
      likes: 0,
      comments: [],
      shares: 0,
    };
    addPost(newPost);
    setIsModalOpen(false);
    setPreviewImage(null);
    setCaption('');
  };

  const handleCancelPost = () => {
    setIsModalOpen(false);
    setPreviewImage(null);
    setCaption('');
  };

  const handleFingerprintClick = () => {
    setIsFingerprintModalOpen(!isFingerprintModalOpen);
  };

  const isNavbarVisible = location.pathname !== '/login' && location.pathname !== '/signup' && location.pathname !== '/forgot-password';

  return (
    <div className="App">
      {isNavbarVisible && (
        <div className="bottom-navbar d-flex justify-content-around align-items-center fixed-bottom bg-dark py-2 border-top border-secondary">
          <Link to="/" className="nav-item text-white">
            <FaHome size={30} />
          </Link>
          <Link to="/year-selection" className="nav-item text-white">
            <FaClipboardList size={30} />
          </Link>
          <label className="nav-item text-white">
            <FaPlusCircle size={30} />
            <input type="file" onChange={handleFileChange} style={{ display: 'none' }} />
          </label>
          <Link to="/profile" className="nav-item text-white">
            <FaUserCircle size={30} />
          </Link>
          <Link to="/messenger" className="nav-item text-white">
            <FaCommentAlt size={30} />
          </Link>
          <div className="nav-item text-white" onClick={handleFingerprintClick}>
            <FaFingerprint size={30} />
          </div>
          <Settings />
        </div>
      )}

      {/* Post Confirmation Modal */}
      {isModalOpen && (
        <div className="modal-overlay">
          <div className="modal-content zoom-in">
            <h4 className="confirm-message">Are you sure you want to post this?</h4>
            {previewImage && <img src={previewImage} alt="Preview" className="preview-image" />}
            <input
              type="text"
              placeholder="Enter caption..."
              value={caption}
              onChange={(e) => setCaption(e.target.value)}
              className="caption-input"
            />
            <div className="modal-buttons">
              <button onClick={handleConfirmPost} className="btn btn-primary">Post</button>
              <button onClick={handleCancelPost} className="btn btn-secondary">Cancel</button>
            </div>
          </div>
        </div>
      )}

      {/* Fingerprint Authentication Modal */}
      {isFingerprintModalOpen && (
        <div className="fingerprint-modal-overlay">
          <div className="fingerprint-modal-content">
            <h3>Verify Your Attendance</h3>
            <FingerprintAuthentication />
            <button className="btn btn-secondary" onClick={() => setIsFingerprintModalOpen(false)}>Close</button>
          </div>
        </div>
      )}

      <Routes>
        <Route path="/" element={<Home posts={posts} setPosts={setPosts} />} />
        <Route path="/profile" element={<Profile posts={posts} />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/messenger" element={<Messenger />} />
        <Route path="/chat" element={<ChatRoom />} />
        <Route path="/student-details" element={<StudentDetails />} />
        <Route path="/attendance" element={<Attendance />} />
        <Route path="/year-selection" element={<YearSelection />} /> {/* New Route for Year Selection */}
        <Route path="/room/:groupName" element={<Room />} /> {/* Room route */}
      </Routes>
    </div>
  );
}

export default App;
