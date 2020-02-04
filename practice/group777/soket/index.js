const express = require('express');
const app = express();
const socket = require('socket.io');
const http = require('http');

const port = process.env.PORT || 3000;

const server = http.createServer(app);
const io = socket(server);

let count = 0;
let msg = [{text: 'Lorem'}];

app.use(express.static(__dirname + '/public'));

io.on('connection', (socket) => {
  console.log('New Socket');

  socket.emit('countUpdated', count);

  socket.on('increment', () => {
    count++;
    io.emit('countUpdated', count)
  })

  socket.emit('sendMess', msg)

});

server.listen(port, function () {
  console.log(`Listening on port ${port}!`);
});