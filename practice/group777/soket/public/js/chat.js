const socket = io();

socket.on('countUpdated', (count) => {
  console.log('Update count', count);
  document.getElementById('test').innerHTML = count;
})

document.getElementById('btn').onclick = function () {
  console.log('Click');
  socket.emit('increment');
}

const text = document.getElementById('text');
document.getElementById('save').onclick = function () {
  console.log(text.value)
  socket.emit('sendMess', text.value)
  text.value = '';
}

socket.on('addMess', (mess) => {
  document.getElementById('mess').innerHTML += `<p style="background-color: ${mess.color}">${mess.msg}<p/>`;
  console.log(mess)
});

