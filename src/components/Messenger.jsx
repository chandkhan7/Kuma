import React, { useState, useRef, useEffect } from 'react';
import './Messenger/Messenger.css';
import { FaPaperPlane } from 'react-icons/fa'; // Import the paper plane icon from react-icons

function Messenger() {
  const [messages, setMessages] = useState([]);
  const [message, setMessage] = useState('');
  const inputRef = useRef(null); // Reference for input field to keep it focused
  const messagesEndRef = useRef(null); // For auto-scrolling to the bottom of messages

  // Function to send message
  const handleSendMessage = () => {
    if (message.trim()) {
      setMessages([...messages, { text: message, sender: 'You' }]);
      setMessage('');
      inputRef.current.focus(); // Keep input focused to prevent keyboard from closing
    }
  };

  // Handle pressing Enter to send message
  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && message.trim()) {
      handleSendMessage();
    }
  };

  // Auto-scroll to the bottom when a new message is added
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
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
          ref={inputRef} // Attach the input reference
        />
        {/* Paper plane icon as the send button */}
        <FaPaperPlane
          size={25} // Icon size
          onClick={handleSendMessage} // Trigger message send when clicked
          className="send-icon"
          style={{ cursor: 'pointer', color: '#007bff' }} // Style the icon
        />
      </div>
    </div>
  );
}

export default Messenger;
