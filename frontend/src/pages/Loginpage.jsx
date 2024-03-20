import React, { useState } from 'react'
import {Navigate} from 'react-router-dom'
const Loginpage = () => {
  const[username,setusername]=useState("");
  const[userpass,setuserpass]=useState("");
  const[redirect,setredirect]=useState(false);
  const login=async(ev)=>{
    ev.preventDefault();
  const res=  await fetch('http://localhost:4000/login',{
      method: 'POST',
      body: JSON.stringify({username,userpass}),
      headers: {'content-type': 'application/json'},
      credentials:'include',
    });
    if(res.ok){
      setredirect(true);
    }
    else{
      alert('worng credentials ');
    }
  }
  if(redirect){
    // alert('redirect');
    return <Navigate to={'/'}/>
  }
  return (
        <form className='login' onSubmit={login}>
            <h1>Login</h1>
            <input type="text" placeholder='User name' value={username} 
            onChange={ev=>{setusername(ev.target.value)}} />
            <input type="password" placeholder='password' value={userpass}
            onChange={ev=>{setuserpass(ev.target.value)}} />
            <button>Login</button>
        </form>
  )
}

export default Loginpage