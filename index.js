const express = require('express');
const app = express();
const http = require('http');
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server);
app.use(express.static('client'));


app.get('/', (req, res) => {
  res.sendFile(__dirname + '/client/index.html');
});

io.on('connection', (socket) => {
  console.log('a user connected');
  socket.broadcast.emit('new connection', 'Someone connected');
    //add socket.on functions here:
  socket.on('disconnect', () => {
    console.log('a user disconnected');
    io.emit('disconnected', 'Someone disconnected');
  });

  socket.on('chat message', (msg) => {
    console.log('message: ' + msg);
    io.emit('chat message', msg);
  });
});

server.listen(3000, () => {
  console.log('listening on *:3000');
});