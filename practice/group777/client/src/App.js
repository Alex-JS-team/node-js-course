import React, {useEffect, useState} from 'react';
import Registration from "./Registration";
import { BrowserRouter, Route } from "react-router-dom";
import Login from "./Login";
import isEmpty from "validator/es/lib/isEmpty";
import CreateTask from "./createTask";


function App(props) {

  const [user, setUser] = useState({});
  const [redirectStatus, setRedirectStatus] = useState(true)
  const [loader, setLoader] = useState(true);

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
      //document.location.href ='/login'
    }

  }, []);



  return (
    <BrowserRouter>
      <Route exact={true} path='/reg' component={Registration}/>
      <Route exact={true} path='/login' component={Login}/>
      <Route exact={true} path='/' render={()=>
        <div className='wrap'>
          <p>{user.name}</p>
          <p>{user.age}</p>
          <p>{user.email}</p>
          <CreateTask/>
        </div>
      }/>
    </BrowserRouter>
  );
}

export default App;
