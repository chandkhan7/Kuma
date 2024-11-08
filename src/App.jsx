import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import Home from './components/home/Home'; // Home page component
import Profile from './components/profile/Profile'; // Profile component
import ChatSystem from './components/chat/ChatSystem'; // Chat system component
import './styles/App.css'; // Global CSS
import { FaFacebookMessenger } from 'react-icons/fa'; // Messenger Icon

function App() {
  const [isChatOpen, setIsChatOpen] = useState(false); // State to handle chat visibility

  // Handle opening/closing of the chat system when the messenger icon is clicked
  const handleMessengerClick = () => {
    setIsChatOpen(!isChatOpen); // Toggle chat visibility
  };

  return (
    <Router>
      <div className="App">
        {/* Navigation bar with Profile icon */}
        <div className="navbar">
          <Link to="/" className="home-link">Home</Link> 
          <Link to="/profile" className="profile-link">
            <img src="path_to_profile_icon" alt="Profile Icon" className="profile-icon" />
          </Link>
        </div>

        {/* Define Routes for different pages */}
        <Routes>
          <Route path="/" element={<Home />} /> {/* Home Page */}
          <Route path="/profile" element={<Profile />} /> {/* Profile Page */}
        </Routes>

        {/* Messenger Icon to open chat */}
        <div className="messenger-icon" onClick={handleMessengerClick}>
          <FaFacebookMessenger size={30} /> {/* Messenger Icon inside the button */}
        </div>

        {/* Chat Modal System */}
        {isChatOpen && (
          <div className="chat-modal-overlay">
            <div className="chat-modal-content">
              {/* Close button for the chat */}
              <button className="close-chat-btn" onClick={handleMessengerClick}>X</button>

              {/* ChatSystem Component */}
              <ChatSystem /> {/* General chat system for all users */}
            </div>
          </div>
        )}
      </div>
    </Router>
  );
}

export default App;

