import React, {useState, useEffect} from 'react';

export default function CreateTask(props) {

  const [title, setTitle] = useState(null);
  const [tasks, setTasks] = useState([]);
  const token = localStorage.getItem('tokenApi');

  useEffect(()=> {
    fetch('/api', {
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      }
    }).then( res => res.json()).then(data => {
      setTasks(data.tasks)
    })
  }, [])

  function task(e) {

    e.preventDefault();
    fetch('/task', {
      method: 'post',
      body: JSON.stringify({title}),
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      }
    })
        .then(res => res.json())
        .then(task => {
          console.log(task)
          setTasks(tasks.concat(task))
        })

  }

  function del(e) {
    const id = e.target.dataset.id;
    fetch('/del/' + id, {
      method: 'DELETE',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      }
    })
      .then(() => {
        setTasks(tasks.filter(el=>el._id != id))
        console.log(id)
      })
  }

  return (
      <>
        <hr />
        <form onSubmit={e=>task(e)}>
          <textarea onChange={e=>setTitle(e.target.value)}></textarea>
          <input type='submit' value='Отправить'/>
        </form>
        <hr />
        {

          tasks.map(({title, status, _id}) => {
            return <div key={_id} className='task'>
              <div>
                <span>{title}</span><span> ||| status: {status.toString()}</span>
                <button data-id={_id} onClick={e=>del(e)}>del</button>
              </div>
            </div>
          })
        }
      </>
  );
}
