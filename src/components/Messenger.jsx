import React, { useState, useRef, useEffect } from 'react';
import './Messenger/Messenger.css';
import { FaPaperPlane, FaImage, FaVideo, FaMicrophone } from 'react-icons/fa'; // Import media icons
import { ReactMediaRecorder } from 'react-media-recorder'; // Import for voice recording

function Messenger() {
  const [messages, setMessages] = useState([]);
  const [message, setMessage] = useState('');
  const inputRef = useRef(null); // Reference for input field to keep it focused
  const messagesEndRef = useRef(null); // For auto-scrolling to the bottom of messages
  const [isRecording, setIsRecording] = useState(false); // Track if recording is in progress
  const [voiceBlobUrl, setVoiceBlobUrl] = useState(null); // Store the voice URL for playback

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
  const handleFileUpload = (e, type) => {
    const file = e.target.files[0];
    if (file) {
      setMessages([
        ...messages,
        {
          sender: 'You',
          file: URL.createObjectURL(file),
          fileType: type,
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

  return (
    <div className="messenger">
      <h3>Messenger</h3>

      <div className="messages-container">
        {messages.map((msg, index) => (
          <div
            key={index}
            className={`message-bubble ${msg.sender === 'You' ? 'sent' : 'received'}`}
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

        {/* File Upload Buttons */}
        <label htmlFor="file-upload-photo">
          <FaImage size={25} className="media-icon" style={{ cursor: 'pointer', color: '#007bff' }} />
        </label>
        <input
          type="file"
          id="file-upload-photo"
          style={{ display: 'none' }}
          onChange={(e) => handleFileUpload(e, 'Image')}
          accept="image/*"
        />

        <label htmlFor="file-upload-video">
          <FaVideo size={25} className="media-icon" style={{ cursor: 'pointer', color: '#007bff' }} />
        </label>
        <input
          type="file"
          id="file-upload-video"
          style={{ display: 'none' }}
          onChange={(e) => handleFileUpload(e, 'Video')}
          accept="video/*"
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
                  <button className="vt-btn"onClick={handleSendVoiceMessage}>Send Voice Note</button>
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
