// src/components/Messenger.js
import React, { useState, useRef, useEffect } from 'react';
import './Messenger/Messenger.css';

function Messenger() {
  const [messages, setMessages] = useState([]);
  const [message, setMessage] = useState('');
  const messagesEndRef = useRef(null); // For auto-scrolling to the bottom

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

  // Auto-scroll to the bottom when a new message is added
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    <div className="messenger">
      <h3>Messenger</h3>
      
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
          Send
        </button>
      </div>
    </div>
  );
}

export default Messenger;
