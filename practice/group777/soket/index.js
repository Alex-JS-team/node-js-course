const express = require('express');
const app = express();
const socket = require('socket.io');
const http = require('http');

const port = process.env.PORT || 3000;

const server = http.createServer(app);
const io = socket(server);

let count = 0;
//let msg = [{text: 'Lorem'}];

app.use(express.static(__dirname + '/public'));

io.on('connection', (socket) => {
  console.log('New Socket');
  socket.messArr = [];


  const color = `#${(Math.random().toString(16) + '000000').substring(2,8).toUpperCase()}`;

  socket.emit('countUpdated', count);

  socket.on('increment', () => {
    count++;
    io.emit('countUpdated', count)
  })

  socket.on('sendMess', (msg) => {
    socket.messArr.push(msg)
    console.log(socket.id, '------')
    console.log(msg);
    io.emit('addMess', {msg, color})
  })

});

server.listen(port, function () {
  console.log(`Listening on port ${port}!`);
});
