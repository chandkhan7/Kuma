import React, { useState } from 'react';
import Profile from './components/profile/Profile'; // Profile component
import ChatSystem from './components/chat/ChatSystem'; // Chat system component
import './styles/App.css';  // Ensure you have this CSS file to style the components
import { FaFacebookMessenger } from 'react-icons/fa'; // Import Messenger Icon

function App() {
  const [isChatOpen, setIsChatOpen] = useState(false); // State to handle chat visibility

  // Handle opening/closing of the chat system when the messenger icon is clicked
  const handleMessengerClick = () => {
    setIsChatOpen(!isChatOpen); // Toggle chat visibility
  };

  return (
    <div className="App">
      {/* Profile Component */}
      <Profile />

      {/* Messenger Icon to open chat */}
      <div className="messenger-icon" onClick={handleMessengerClick}>
        <FaFacebookMessenger /> {/* Messenger Icon inside the button */}
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
  );
}

export default App;
