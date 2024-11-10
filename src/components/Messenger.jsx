import React, { useState, useRef, useEffect } from 'react';
import './Messenger/Messenger.css';
import { FaPaperPlane, FaCamera, FaMicrophone, FaSpinner } from 'react-icons/fa'; // For media icons and loading spinner
import { ReactMediaRecorder } from 'react-media-recorder'; // For voice recording
import io from 'socket.io-client';

// Connect to the socket server
const socket = io("http://localhost:5000"); // Replace with your server URL

function Messenger() {
  const [messages, setMessages] = useState([]);
  const [message, setMessage] = useState('');
  const inputRef = useRef(null); // Reference for input field to keep it focused
  const messagesEndRef = useRef(null); // For auto-scrolling to the bottom of messages
  const [isRecording, setIsRecording] = useState(false); // Track if recording is in progress
  const [voiceBlobUrl, setVoiceBlobUrl] = useState(null); // Store the voice URL for playback
  const [showContextMenu, setShowContextMenu] = useState(false); // State to control context menu visibility
  const [contextMenuPosition, setContextMenuPosition] = useState({ top: 0, left: 0 }); // Position for context menu
  const [selectedMessageIndex, setSelectedMessageIndex] = useState(null); // Track selected message for options
  const contextMenuRef = useRef(null); // Reference to the context menu for detecting outside clicks
  const [isSending, setIsSending] = useState(false); // Prevent multiple message sends

  // Listen for messages from the server
  useEffect(() => {
    socket.on('receive_message', (data) => {
      console.log('Message received:', data.message);
      if (data.sender !== 'You') {
        setMessages((prevMessages) => [
          ...prevMessages,
          { text: data.message, sender: 'Other', status: 'received' }, // Update status and sender
        ]);
      }
    });

    // Socket connection and disconnection management
    socket.on('connect', () => {
      console.log('Connected to server');
    });

    socket.on('disconnect', () => {
      console.log('Disconnected from server');
    });

    return () => {
      socket.off('receive_message');
      socket.off('connect');
      socket.off('disconnect');
    };
  }, [messages]);

  // Send message function with preventing multiple sends
  const handleSendMessage = () => {
    if (message.trim() && !isSending) {
      setIsSending(true);
      socket.emit('send_message', message); // Emit message to the server
      setMessages([...messages, { text: message, sender: 'You', status: 'sending' }]);
      setMessage('');
      inputRef.current.focus(); // Keep input focused to prevent keyboard from closing

      setTimeout(() => {
        setMessages((prevMessages) =>
          prevMessages.map((msg) => (msg.status === 'sending' ? { ...msg, status: 'sent' } : msg))
        );
        setIsSending(false);
      }, 1000); // Simulate sending delay
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && message.trim()) {
      handleSendMessage();
    }
  };

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const fileType = file.type.startsWith('image/') ? 'Image' : 'Video';
      setMessages([
        ...messages,
        {
          sender: 'You',
          file: URL.createObjectURL(file),
          fileType: fileType,
          status: 'sending',
        },
      ]);
    }
  };

  const handleStartRecording = (startRecording) => {
    setIsRecording(true);
    startRecording(); // Start recording on mic icon press
  };

  const handleStopRecording = (stopRecording, mediaBlobUrl) => {
    setIsRecording(false);
    stopRecording(); // Stop recording on mic icon release
    setVoiceBlobUrl(mediaBlobUrl); // Save the audio blob URL for playback
  };

  const handleSendVoiceMessage = () => {
    if (voiceBlobUrl) {
      setMessages([
        ...messages,
        { sender: 'You', file: voiceBlobUrl, fileType: 'Voice', status: 'sending' },
      ]);
      setVoiceBlobUrl(null); // Reset after sending the message
      setTimeout(() => {
        setMessages((prevMessages) =>
          prevMessages.map((msg) => (msg.status === 'sending' ? { ...msg, status: 'sent' } : msg))
        );
      }, 1000); // Simulate sending delay
    }
  };

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (contextMenuRef.current && !contextMenuRef.current.contains(e.target)) {
        setShowContextMenu(false);
      }
    };

    document.addEventListener('click', handleClickOutside);
    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, []);

  const handleMessagePress = (index, e) => {
    e.preventDefault();
    setSelectedMessageIndex(index);
    const messageElement = e.target;
    const { top, left } = messageElement.getBoundingClientRect();
    setContextMenuPosition({ top: top - 40, left: left });
    setShowContextMenu(true);
  };

  const handleCopyMessage = () => {
    const messageText = messages[selectedMessageIndex].text;
    navigator.clipboard.writeText(messageText);
    setShowContextMenu(false);
  };

  const handleDeleteMessage = () => {
    setMessages(messages.filter((_, index) => index !== selectedMessageIndex));
    setShowContextMenu(false);
  };

  const handleCancelDelete = () => {
    setShowContextMenu(false);
  };

  return (
    <div className="messenger">
      <h3>MoonTalk</h3>
      <div className="messages-container">
        {messages.map((msg, index) => (
          <div
            key={index}
            className={`message-bubble ${msg.sender === 'You' ? 'sent' : 'received'} ${msg.status === 'sending' ? 'sending' : ''}`}
            onContextMenu={(e) => handleMessagePress(index, e)}
          >
            <strong>{msg.text}</strong>
            {msg.file && (
              <div>
                {msg.fileType === 'Image' && <img src={msg.file} alt="Uploaded" className="message-image" />}
                {msg.fileType === 'Video' && <video src={msg.file} controls width="200" />}
                {msg.fileType === 'Voice' && <audio src={msg.file} controls />}
              </div>
            )}
            {msg.status === 'sending' && <FaSpinner className="spinner" />}
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>

      {showContextMenu && (
        <div
          className="context-menu"
          style={{
            top: `${contextMenuPosition.top}px`,
            left: `${contextMenuPosition.left}px`,
            zIndex: 1000,
            position: 'absolute',
          }}
          ref={contextMenuRef}
        >
          <ul className="list-unstyled mb-0">
            <li className="p-2" onClick={handleDeleteMessage}>Delete</li>
            <li className="p-2" onClick={handleCopyMessage}>Copy</li>
            <li className="p-2" onClick={handleCancelDelete}>Cancel</li>
          </ul>
        </div>
      )}

      <div className="input-container">
        <input
          type="text"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Type a message..."
          className="message-input"
          ref={inputRef}
          aria-label="Type a message"
        />
        <FaPaperPlane size={25} onClick={handleSendMessage} className="send-icon" style={{ cursor: 'pointer' }} />
        <label htmlFor="file-upload" style={{ cursor: 'pointer' }} aria-label="Upload media">
          <FaCamera size={25} className="media-icon" />
        </label>
        <input
          type="file"
          id="file-upload"
          style={{ display: 'none' }}
          onChange={handleFileUpload}
          accept="image/*,video/*"
          aria-label="Choose media file"
        />

        <ReactMediaRecorder
          render={({ status, startRecording, stopRecording, mediaBlobUrl }) => (
            <>
              <FaMicrophone
                size={25}
                className="media-icon"
                onMouseDown={() => handleStartRecording(startRecording)}
                onMouseUp={() => handleStopRecording(stopRecording, mediaBlobUrl)}
                onMouseLeave={() => handleStopRecording(stopRecording, mediaBlobUrl)}
                aria-label="Record voice message"
              />
              {voiceBlobUrl && (
                <button onClick={handleSendVoiceMessage} aria-label="Send voice message">Send</button>
              )}
            </>
          )}
        />
      </div>
    </div>
  );
}

export default Messenger;
