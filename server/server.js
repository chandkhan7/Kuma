const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
const cors = require('cors');
const mongoose = require('mongoose');

// Create the Express app and HTTP server
const app = express();
const server = http.createServer(app);
const io = socketIo(server);

// Enable CORS for front-end communication
app.use(cors());

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/mooncloud', { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.log('MongoDB connection error:', err));

// Define the message schema
const messageSchema = new mongoose.Schema({
  message: String,
  timestamp: { type: Date, default: Date.now }
});

const Message = mongoose.model('Message', messageSchema);

// Listen for socket connection
io.on('connection', (socket) => {
  console.log('User connected');

  // Fetch and send all previous messages when a user connects
  socket.emit('receive_message', async () => {
    const messages = await Message.find();
    socket.emit('receive_message', messages);
  });

  // Listen for 'send_message' event from frontend and save it to MongoDB
  socket.on('send_message', async (data) => {
    console.log('Message received:', data);
    
    // Save message to the database
    const newMessage = new Message(data);
    await newMessage.save();

    // Broadcast the new message to all connected clients
    io.emit('receive_message', data);
  });

  // Handle socket disconnection
  socket.on('disconnect', () => {
    console.log('User disconnected');
  });
});

// Start the server on the correct port
server.listen(3001, () => {
  console.log('Server is running on http://localhost:3001');
});
