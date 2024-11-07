import React, { useState, useEffect } from 'react';
import { io } from 'socket.io-client';
import '../../styles/chat/ChatSystem.css';

const socket = io('http://localhost:4000'); // Replace with your socket server URL

const ChatSystem = ({ userId }) => {
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([]);
  const [typing, setTyping] = useState(false);

  useEffect(() => {
    // Listen for incoming messages
    socket.on('receive_message', (data) => {
      setMessages((prevMessages) => [...prevMessages, data]);
    });

    // Listen for typing status
    socket.on('typing', (user) => {
      setTyping(`${user} is typing...`);
    });

    // Cleanup on component unmount
    return () => {
      socket.off('receive_message');
      socket.off('typing');
    };
  }, []);

  const handleSendMessage = () => {
    if (message.trim()) {
      const messageData = {
        userId,
        message,
        timestamp: new Date().toLocaleTimeString(),
      };
      
      // Emit the message to the server
      socket.emit('send_message', messageData);
      
      // Add the message locally
      setMessages((prevMessages) => [...prevMessages, messageData]);
      setMessage('');
    }
  };

  const handleTyping = (e) => {
    setMessage(e.target.value);

    if (e.target.value) {
      socket.emit('typing', userId); // Emit typing event
    } else {
      socket.emit('stop_typing', userId); // Stop typing event
    }
  };

  return (
    <div className="chat-container">
      <div className="chat-header">
        <h3>MOONCLOUD Chat</h3>
      </div>
      
      <div className="chat-box">
        {messages.map((msg, index) => (
          <div key={index} className="message">
            <div className="message-content">
              <span className="message-user">{msg.userId}</span>: 
              <span className="message-text">{msg.message}</span>
            </div>
            <span className="message-timestamp">{msg.timestamp}</span>
          </div>
        ))}
      </div>

      {typing && <div className="typing-indicator">{typing}</div>}

      <div className="chat-input">
        <input 
          type="text" 
          value={message}
          onChange={handleTyping}
          onKeyDown={(e) => e.key === 'Enter' && handleSendMessage()}
          placeholder="Type a message..."
        />
        <button onClick={handleSendMessage}>Send</button>
      </div>
    </div>
  );
};

export default ChatSystem;
