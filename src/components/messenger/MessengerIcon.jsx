// src/components/messenger/MessengerIcon.jsx
import React from 'react';
import { FaFacebookMessenger } from 'react-icons/fa'; // Import Messenger icon

const MessengerIcon = ({ onClick }) => {
  return (
    <div className="messenger-icon" onClick={onClick}>
      <FaFacebookMessenger /> {/* Messenger Icon inside the button */}
    </div>
  );
};

export default MessengerIcon;
