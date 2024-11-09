// src/components/ChatRoom.js
import React, { useState, useEffect, useRef } from 'react';
import './ChatRoom.css';  // Import custom styles for the chat room
import { FaPaperPlane } from 'react-icons/fa'; // Import the send icon

function ChatRoom() {
  const [messages, setMessages] = useState([]);
  const [message, setMessage] = useState('');
  const messagesEndRef = useRef(null); // To scroll to the latest message

  const handleSendMessage = () => {
    if (message.trim()) {
      setMessages([...messages, { text: message, sender: 'You' }]);
      setMessage('');
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && message.trim()) {
      handleSendMessage();
    }
  };

  // Auto-scroll to the latest message when it is added
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    <div className="chat-room-container">
      {/* Chat Header */}
      <div className="chat-header d-flex justify-content-between align-items-center">
        <h5 className="text-white">Chat Room</h5>
        <div className="close-btn">
          <button className="btn btn-light">X</button>
        </div>
      </div>

      {/* Messages Display Area */}
      <div className="messages-container">
        {messages.map((msg, index) => (
          <div 
            key={index} 
            className={`message-bubble ${msg.sender === 'You' ? 'sent' : 'received'}`}
          >
            <strong>{msg.sender}: </strong>{msg.text}
          </div>
        ))}
        {/* Scroll to bottom */}
        <div ref={messagesEndRef} />
      </div>

      {/* Input Area */}
      <div className="input-container">
        <input 
          type="text" 
          value={message} 
          onChange={(e) => setMessage(e.target.value)} 
          onKeyDown={handleKeyDown} 
          placeholder="Type a message..." 
          className="message-input"
        />
        <button 
          onClick={handleSendMessage} 
          className="send-button" 
          aria-label="Send message"
        >
          <FaPaperPlane size={20} />
        </button>
      </div>
    </div>
  );
}

export default ChatRoom;
