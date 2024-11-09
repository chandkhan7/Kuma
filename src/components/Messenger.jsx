import React, { useState, useRef, useEffect } from 'react';
import './Messenger/Messenger.css';
import { FaPaperPlane, FaCamera, FaMicrophone } from 'react-icons/fa'; // Use FaCamera for both photo and video
import { ReactMediaRecorder } from 'react-media-recorder'; // For voice recording

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

  // Handle sending media files (Image, Video)
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
        },
      ]);
    }
  };

  // Handle starting and stopping voice recording with mouse events
  const handleStartRecording = (startRecording) => {
    setIsRecording(true);
    startRecording(); // Start recording on mic icon press
  };

  const handleStopRecording = (stopRecording, mediaBlobUrl) => {
    setIsRecording(false);
    stopRecording(); // Stop recording on mic icon release
    setVoiceBlobUrl(mediaBlobUrl); // Save the audio blob URL for playback
  };

  // Function to send voice message
  const handleSendVoiceMessage = () => {
    if (voiceBlobUrl) {
      setMessages([
        ...messages,
        { sender: 'You', file: voiceBlobUrl, fileType: 'Voice' },
      ]);
      setVoiceBlobUrl(null); // Reset after sending the message
    }
  };

  // Auto-scroll to the bottom when a new message is added
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  // Close context menu if user clicks anywhere outside of it
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

  // Function to handle long press or right-click on a message
  const handleMessagePress = (index, e) => {
    e.preventDefault(); // Prevent default context menu
    setSelectedMessageIndex(index);

    // Calculate the position for the context menu to appear above the message
    const messageElement = e.target;
    const { top, left } = messageElement.getBoundingClientRect(); // Get position of the message element

    setContextMenuPosition({ top: top - 40, left: left }); // Position 40px above the message
    setShowContextMenu(true); // Show context menu
  };

  // Function to copy the message text to clipboard
  const handleCopyMessage = () => {
    const messageText = messages[selectedMessageIndex].text;
    navigator.clipboard.writeText(messageText); // Copy the message text to clipboard
    setShowContextMenu(false);
  };

  // Function to delete the message
  const handleDeleteMessage = () => {
    setMessages(messages.filter((_, index) => index !== selectedMessageIndex)); // Remove the selected message from the list
    setShowContextMenu(false); // Close the context menu
  };

  // Function to cancel delete action
  const handleCancelDelete = () => {
    setShowContextMenu(false); // Simply close the context menu
  };

  return (
    <div className="messenger">
      <h3>Messenger</h3>

      <div className="messages-container">
        {messages.map((msg, index) => (
          <div
            key={index}
            className={`message-bubble ${msg.sender === 'You' ? 'sent' : 'received'}`}
            onContextMenu={(e) => handleMessagePress(index, e)} // Detect right-click or long press
          >
            <strong>{msg.sender}: </strong>
            {msg.text}

            {/* Conditional rendering for file type */}
            {msg.file && (
              <div>
                {/* Display image if it's an image file */}
                {msg.fileType === 'Image' && (
                  <img src={msg.file} alt="Uploaded" className="message-image" />
                )}

                {/* Display video if it's a video file */}
                {msg.fileType === 'Video' && <video src={msg.file} controls width="200" />}

                {/* Display voice note if it's a voice note */}
                {msg.fileType === 'Voice' && (
                  <audio src={msg.file} controls />
                )}
              </div>
            )}
          </div>
        ))}
        {/* Scroll to bottom */}
        <div ref={messagesEndRef} />
      </div>

      {/* Context Menu */}
      {showContextMenu && (
        <div
          className="context-menu"
          style={{
            top: `${contextMenuPosition.top}px`, // Position context menu above the message
            left: `${contextMenuPosition.left}px`, // Position context menu based on the message's left position
            zIndex: 1000, // Ensure context menu is on top
            position: 'absolute', // Absolutely position the menu
          }}
          ref={contextMenuRef} // Attach reference to the context menu
        >
          <ul className="list-unstyled mb-0">
            <li className="p-2" onClick={handleDeleteMessage}>Delete</li> {/* Delete option first */}
            <li className="p-2" onClick={handleCopyMessage}>Copy</li> {/* Copy option second */}
            <li className="p-2" onClick={handleCancelDelete}>Cancel</li> {/* Cancel option last */}
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
        />
        <FaPaperPlane size={25} onClick={handleSendMessage} className="send-icon" style={{ cursor: 'pointer', color: '#007bff' }} />

        {/* Single File Upload Button for Photos and Videos */}
        <label htmlFor="file-upload" style={{ cursor: 'pointer' }}>
          <FaCamera size={25} className="media-icon" style={{ color: '#007bff' }} />
        </label>
        <input
          type="file"
          id="file-upload"
          style={{ display: 'none' }}
          onChange={handleFileUpload}
          accept="image/*,video/*" // Allow both images and videos
        />

        {/* Voice Note Button */}
        <ReactMediaRecorder
          render={({ status, startRecording, stopRecording, mediaBlobUrl }) => (
            <div>
              <FaMicrophone
                size={25}
                className="media-icon"
                style={{ cursor: 'pointer', color: '#007bff' }}
                onMouseDown={() => handleStartRecording(startRecording)} // Start recording on mic press
                onMouseUp={() => handleStopRecording(stopRecording, mediaBlobUrl)} // Stop recording and show voice message when released
              />
              {isRecording && <span>Recording...</span>} {/* Show "Recording..." when active */}
              {/* Display recorded voice for playback */}
              {voiceBlobUrl && !isRecording && (
                <div>
                  <audio src={voiceBlobUrl} controls />
                  <button className="vt-btn" onClick={handleSendVoiceMessage}>Send Voice Note</button>
                </div>
              )}
            </div>
          )}
        />
      </div>
    </div>
  );
}

export default Messenger;
