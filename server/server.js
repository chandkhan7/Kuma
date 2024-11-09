const express = require('express');
const http = require('http');
const socketIo = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = socketIo(server);

let messages = []; // Array to store messages for simplicity (you can replace it with a database)

app.get('/', (req, res) => {
  res.send('Server is running');
});

io.on('connection', (socket) => {
  console.log('A user connected');

  // Send existing messages when the user connects
  socket.emit('receive_message', messages);

  // Listen for a message to be sent
  socket.on('send_message', (messageData) => {
    messages.push(messageData); // Save the message to the array (you can replace it with a database)
    io.emit('receive_message', messageData); // Emit the message to all users
  });

  // Handle image files (Optional: you can modify this to store files on the server or a cloud storage)
  socket.on('send_image', (imageData) => {
    // Assuming imageData is a base64 string or a URL pointing to the image
    messages.push(imageData);
    io.emit('receive_message', imageData);
  });

  socket.on('disconnect', () => {
    console.log('A user disconnected');
  });
});

server.listen(3001, () => {
  console.log('Server is running on http://localhost:3001');
});
