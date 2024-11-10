import React, { useState, useEffect } from 'react';
import { Routes, Route, Link, useLocation } from 'react-router-dom';
import Home from './components/home/Home';
import Profile from './components/profile/Profile';
import Signup from './components/Signup';
import Login from './components/Login';
import { FaUserCircle, FaHome, FaPlusCircle, FaCommentAlt } from 'react-icons/fa';
import './styles/App.css';
import Settings from './components/Settings';
import Messenger from './components/Messenger';
import ChatRoom from './components/Chatroom/ChatRoom';

function App() {
  const [themeColor, setThemeColor] = useState(localStorage.getItem('themeColor') || 'dark'); // Default theme is dark
  const [posts, setPosts] = useState([]);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [previewImage, setPreviewImage] = useState(null);
  const [caption, setCaption] = useState('');
  const location = useLocation();

  useEffect(() => {
    // Apply the selected theme class to the body element globally
    document.body.className = themeColor;
    localStorage.setItem('themeColor', themeColor); // Store theme in localStorage

    // Load posts from localStorage
    const savedPosts = JSON.parse(localStorage.getItem('posts')) || [];
    setPosts(savedPosts);

    // Load login status from localStorage
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

  const isNavbarVisible = location.pathname !== '/login' && location.pathname !== '/signup';

  return (
    <div className="App">
      {isNavbarVisible && (
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
            <FaCommentAlt size={30} />
          </Link>
          <Settings isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} themeColor={themeColor} setThemeColor={setThemeColor} />
        </div>
      )}

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

      {/* Define Routes */}
      <Routes>
        <Route path="/" element={<Home posts={posts} setPosts={setPosts} />} />
        <Route path="/profile" element={<Profile posts={posts} />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="/messenger" element={<Messenger />} />
        <Route path="/chat" element={<ChatRoom />} />
      </Routes>
    </div>
  );
}

export default App;
