const http = require('http');
const socketIo = require('socket.io');

// Create an HTTP server
const server = http.createServer((req, res) => {
  res.writeHead(200, { 'Content-Type': 'text/plain' });
  res.end('Socket server is running');
});

// Initialize socket.io with CORS configuration
const io = socketIo(server, {
  cors: {
    origin: "http://localhost:3000",  // Change this to your frontend URL
    methods: ["GET", "POST"],
  }
});

// Handle socket connections
io.on('connection', (socket) => {
  console.log('New client connected:', socket.id);

  // Listen for incoming messages
  socket.on('send_message', (message) => {
    console.log('Message received:', message);
    // Broadcast the message to all connected clients
    io.emit('receive_message', { message, sender: 'You' });
  });

  // Handle user disconnection
  socket.on('disconnect', () => {
    console.log('Client disconnected:', socket.id);
  });
});

// Start the server
const PORT = process.env.PORT || 5000;
server.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
});
