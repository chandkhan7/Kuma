// socket.js (on your server)
const http = require('http');
const socketIo = require('socket.io');

const server = http.createServer((req, res) => {
  res.writeHead(200, { 'Content-Type': 'text/plain' });
  res.end('Socket server is running');
});

const io = socketIo(server, {
  cors: {
    origin: "http://localhost:3000",  // Your client URL
    methods: ["GET", "POST"]
  }
});

io.on('connection', (socket) => {
  console.log('New client connected');
  
  socket.on('send_message', (message) => {
    // Broadcast the message to all other clients
    io.emit('receive_message', { message });
  });
  
  socket.on('disconnect', () => {
    console.log('Client disconnected');
  });
});

server.listen(5000, () => {
  console.log('Server is listening on port 5000');
});
