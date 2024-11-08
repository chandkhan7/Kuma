import React, { useState, useEffect, useRef } from 'react';
import { FaPaperPlane, FaImage, FaMicrophone } from 'react-icons/fa'; // FontAwesome icons
import { io } from 'socket.io-client';
import '../../styles/chat/ChatSystem.css'; // Make sure the CSS path is correct

const socket = io('http://localhost:3001'); // Socket URL

const ChatSystem = ({ userId }) => {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const [file, setFile] = useState(null);
  const [isRecording, setIsRecording] = useState(false);
  const messagesEndRef = useRef(null);

  useEffect(() => {
    socket.on('receive_message', (message) => {
      setMessages((prevMessages) => [...prevMessages, message]);
    });
    socket.emit('get_messages'); // Get existing messages when the chat starts

    return () => {
      socket.off('receive_message');
    };
  }, []);

  useEffect(() => {
    // Scroll to the bottom when new message is received
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages]);

  const handleSendMessage = () => {
    if (newMessage.trim()) {
      const messageData = { userId, message: newMessage, type: 'text' };
      socket.emit('send_message', messageData);
      setMessages((prevMessages) => [...prevMessages, messageData]);
      setNewMessage('');
    }
  };

  const handleSendImage = (event) => {
    const image = event.target.files[0];
    if (image) {
      const imageData = { userId, message: image, type: 'image' };
      socket.emit('send_message', imageData);
      setMessages((prevMessages) => [...prevMessages, imageData]);
    }
  };

  const handleRecordAudio = () => {
    if (!isRecording) {
      setIsRecording(true);
      // Implement audio recording functionality here
    } else {
      setIsRecording(false);
      // Stop recording and send audio
    }
  };

  return (
    <div className="chat-container">
      <div className="chat-header">Chat</div>

      <div className="chat-box">
        {messages.map((msg, index) => (
          <div
            key={index}
            className={`message ${msg.type} ${msg.direction || 'incoming'}`}
          >
            {msg.type === 'text' ? (
              <p>{msg.message}</p>
            ) : msg.type === 'image' ? (
              <img src={msg.message} alt="Image" className="message-image" />
            ) : msg.type === 'audio' ? (
              <audio controls>
                <source src={msg.message} />
              </audio>
            ) : null}
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>

      <div className="chat-input">
        <input
          type="text"
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          placeholder="Type a message"
        />
        <div className="message-icons">
          <label htmlFor="image-upload">
            <FaImage />
            <input
              type="file"
              id="image-upload"
              accept="image/*"
              style={{ display: 'none' }}
              onChange={handleSendImage}
            />
          </label>

          <FaMicrophone onClick={handleRecordAudio} />
        </div>
        <button className="send-message" onClick={handleSendMessage}>
          <FaPaperPlane />
        </button>
      </div>
    </div>
  );
};

export default ChatSystem;
