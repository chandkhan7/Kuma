// server.js
const express = require('express');
const http = require('http');
const socketIo = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = socketIo(server);

io.on('connection', (socket) => {
  console.log('User connected');
  socket.emit('receive_message', { sender: 'Server', message: 'Hello from server' });

  socket.on('send_message', (message) => {
    console.log('Message received: ', message);
    io.emit('receive_message', { sender: 'You', message });  // Broadcast message
  });
});

server.listen(5000, () => {
  console.log('Server is running on port 5000');
});
