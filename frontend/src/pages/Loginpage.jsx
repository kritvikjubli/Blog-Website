import React, { useState } from 'react'

const Loginpage = () => {
  const[username,setusername]=useState("");
  const[userpass,setuserpass]=useState("");

  const login=async(ev)=>{
    ev.preventDefault();
    fetch('http://localhost:4000/login',{
      method: 'POST',
      body: JSON.stringify({username,userpass}),
      headers: {'content-type': 'application/json'}
    });
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