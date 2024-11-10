// src/components/Messenger.js
import React, { useState, useRef, useEffect } from 'react';
import '../Messenger/Messenger.css';
import './ChatRoom.css'; // Import custom styles for the chat room

function Messenger() {
  const [messages, setMessages] = useState([]);
  const [message, setMessage] = useState('');
  const inputRef = useRef(null); // Reference for input field to keep focus

  const handleSendMessage = () => {
    if (message.trim()) {
    
      setMessage('');
      // Keep the input focused after sending a message
      inputRef.current.focus();
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && message.trim()) {
      handleSendMessage();
    }
  };

  return (
    <div className="messenger">
      <div className="messages-container">
        {messages.map((msg, index) => (
          <div key={index} className={`message-bubble ${msg.sender === 'You' ? 'sent' : 'received'}`}>
            {msg.text}
          </div>
        ))}
      </div>
      <div className="input-container">
        <input 
          ref={inputRef} // Bind input to reference
          type="text" 
          value={message} 
          onChange={(e) => setMessage(e.target.value)} 
          onKeyDown={handleKeyDown} 
          placeholder="Type a message..." 
          className="message-input"
        />
        <button onClick={handleSendMessage} className="send-icon" aria-label="Send message">
          {/* Plane icon here */}
        </button>
      </div>
    </div>
  );
}

export default Messenger;
