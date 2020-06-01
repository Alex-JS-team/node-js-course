try {
  const send = document.getElementById('send')

  send.addEventListener('click', function (e) {
    e.preventDefault();
    const inputName = document.getElementsByName('userName')[0];
    const inputAge = document.getElementsByName('age')[0];
    if(inputName.value == '' || inputAge.value == '') return;
    const data = {
      userName: inputName.value,
      age: inputAge.value
    };
    fetch('/save', {
      method: 'post',
      body: JSON.stringify(data),
      headers: {
        'Content-Type': 'application/json'
      }
    }).then(() => {
      document.getElementById('form').reset();
      console.log(JSON.stringify(data), 'send..');
      const list = document.getElementById('list');
      let li = document.createElement('li');
      li.innerText = data.userName;
      list.appendChild(li)
    })
  });

}catch (e) {
  console.log(e)
}


try {
  let btn = document.querySelectorAll('.user');
  btn.forEach(el=> {
    el.addEventListener('click', function (e) {
      const tag = e.target;
      if(tag.classList.contains('del')) {
        const element = tag.parentNode;
        const id = element.getAttribute('data-id');
        const data = {
          id: id
        };
        fetch('/del', {
          method: 'post',
          body: JSON.stringify(data),
          headers: {
            'Content-Type': 'application/json'
          }
        }).then(() => {
          element.remove();
          console.log(JSON.stringify(data), 'del..')
        })
      }
    })
  });
}catch (e) {
  console.log(e)
}
