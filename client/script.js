var socket = io();
    
var messages = document.getElementById('messages');
var form = document.getElementById('form');
var inputMessage = document.getElementById('inputMessage');

 postMessage = (msg) => {
  var item = document.createElement('li');
  item.textContent = msg;
  messages.appendChild(item);
  window.scrollTo(0, document.body.scrollHeight);
 }

form.addEventListener('submit', function(e) {
  e.preventDefault();
  if (inputMessage.value) {
    socket.emit('chat message', inputMessage.value);
    inputMessage.value = '';
  }
});

socket.on('new connection', function(msg) {
  postMessage(msg);
});


socket.on('disconnected', function(msg) {
  postMessage(msg);
});      

socket.on('chat message', function(msg) {
  postMessage(msg);
});