import React, {useEffect, useState} from 'react';
import Login from "./Login";
import CreateTask from "./createTask";
import Avatar from './Avatar'


function App(props) {

  const [user, setUser] = useState({});
  const [status, setStatus] = useState(false);

  useEffect(() => {
    if(localStorage.getItem('tokenApi')) {
      const token = localStorage.getItem('tokenApi');
      console.log(token)
      fetch('/api', {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        }
      }).then( res => res.json()).then(data => {
        setUser(data.user)
      })
    }else {
      setStatus(true)
    }

  }, []);

  return (
      <>
        {
          status ?
              <Login/>
              :
              <div className='wrap'>
                <p>{user.name}</p>
                <p>{user.age}</p>
                <p>{user.email}</p>
                <Avatar id={user._id}/>
                <CreateTask/>
              </div>
        }
      </>
  );
}

export default App;
