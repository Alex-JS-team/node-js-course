const socket = io();

socket.on('countUpdated', (count) => {
  console.log('Update count', count)
  document.getElementById('test').innerHTML = count;
})

document.getElementById('btn').onclick = function () {
  console.log('Click')
  socket.emit('increment')
}

socket.on('sendMess', (msg) => {
  console.log(msg)
})