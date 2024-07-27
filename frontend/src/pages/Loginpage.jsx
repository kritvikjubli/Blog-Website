import React, { useContext, useState } from 'react'
import {Navigate} from 'react-router-dom'
import { userContext } from './../userContext';
const Loginpage = () => {
  const[username,setusername]=useState("");
  const[userpass,setuserpass]=useState("");
  const[redirect,setredirect]=useState(false);
  const {setuserinfo}=useContext(userContext);
  const login=async(ev)=>{
    ev.preventDefault();
  const res=  await fetch('https://blog-website-51jr.onrender.com/login',{
      method: 'POST',
      body: JSON.stringify({username,userpass}),
      headers: {'content-type': 'application/json'},
      credentials:'include',
    });
    if(res.ok){
      res.json().then(userinfo=>{
        setuserinfo(userinfo);
        setredirect(true);
      })
    }
    else{
      alert('worng credentials ');
    }
  }
  if(redirect){
    return <Navigate to={'/'}/>
  }
  return (
        <form className='login' onSubmit={login}>
            <h1>Login</h1>
            <input type="text" placeholder='User name' value={username} 
            onChange={ev=>{setusername(ev.target.value)}} reqired />
            <input type="password" placeholder='password' value={userpass}
            onChange={ev=>{setuserpass(ev.target.value)}} required />
            <button>Login</button>
        </form>
  )
}

export default Loginpage
