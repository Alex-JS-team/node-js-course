if(localStorage.getItem('tokenManagerAPI')) {
  (async function () {
    const token = localStorage.getItem('tokenManagerAPI');
    const data = await fetch('/api', {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      }
    })
    const json = await data.json();
    const users = json.map(el=>el.users);
    const userData = users.map((el) => {
      return el.map(({age}) => {
        return `
          <p>${age}</p>
        `;
      })
    })
    console.log(userData)
  }())
}