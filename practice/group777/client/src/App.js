import React, {useEffect} from 'react';
import Registration from "./Registration";



function App() {

  useEffect(() => {
    console.log(1)
    if(localStorage.getItem('tokenApi')) {
      console.log(localStorage.getItem('tokenApi'))
    }
  }, []);

  return (
    <>
      <Registration/>
    </>
  );
}

export default App;
