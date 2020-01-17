try {
  const send = document.getElementById('send');
  const form = document.getElementById('form');

  send.addEventListener('click', function (e) {
    e.preventDefault();
    const inputName = document.getElementsByName('userName')[0];
    const inputAge = document.getElementsByName('age')[0];
    if(inputName.value == '' || inputAge.value == '') return;
    const data = {
      userName: inputName.value,
      age: inputAge.value
    };
    fetch('/user', {
      method: 'post',
      body: JSON.stringify(data),
      headers: {
        'Content-Type': 'application/json'
      }
    }).then((res) => {
      console.log(JSON.stringify(data), 'send..');
      let error = document.createElement('div');
      error.style.color = 'red';
      if(res.status == 525) {
        error.innerText = 'мин - 1, макс - 150 для возраста';
        form.appendChild(error);
        setTimeout(()=>error.remove(), 1000);
        return;
      }else if(res.status == 526) {
        error.innerText = 'Имя должно быть больше 5 символов';
        form.appendChild(error);
        setTimeout(()=>error.remove(), 1000);
        return;
      }else {
        const list = document.getElementById('list');
        let li = document.createElement('li');
        li.innerText = data.userName;
        list.appendChild(li);
        form.reset();
      }
    })
  });

}catch (e) {
  console.log(e)
}

try {
  const send = document.getElementById('send2');
  const form = document.getElementById('form2');

  send.addEventListener('click', function (e) {
    e.preventDefault();
    const inputTitle = document.getElementsByName('title')[0];
    if(inputTitle.value == '') return;
    const data = {
      title: inputTitle.value
    };
    fetch('/task', {
      method: 'post',
      body: JSON.stringify(data),
      headers: {
        'Content-Type': 'application/json'
      }
    }).then((res) => {
      console.log(JSON.stringify(data), 'send..');
      let error = document.createElement('div');
      error.style.color = 'red';
      if(res.status == 527) {
        error.innerText = 'Минимум 10 символов';
        form.appendChild(error);
        setTimeout(()=>error.remove(), 1000);
        return;
      }else {
        const list = document.getElementById('list2');
        let li = document.createElement('li');
        li.innerText = data.title;
        list.appendChild(li);
        form.reset();
      }
    })
  });

}catch (e) {
  console.log(e)
}

try {
  let btn = document.querySelectorAll('.item');
  btn.forEach(el=> {
    el.addEventListener('click', function (e) {
      const tag = e.target;
      if(tag.classList.contains('del')) {
        const element = tag.parentNode;
        const id = element.getAttribute('data-id');
        fetch(`/del/${id}`, {
          method: 'DELETE'
        }).then(() => {
          element.remove();
          console.log('del..', id)
        })
      }
    })
  });
}catch (e) {
  console.log(e)
}
