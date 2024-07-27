import React, { useState } from 'react'

const Registerpage = () => {
  const [username,setusername]=useState("");
  const [userpass,setuserpass]=useState("");
  const register=async(ev)=>{
    ev.preventDefault();
     const res= await fetch(`https://blog-website-51jr.onrender.com/register`,{
        method:'POST',
        body:JSON.stringify({username,userpass}),
        headers:{'Content-Type':'application/json'}
      })
      if(res.status!==200) {
        alert('Error');
      }else{
        alert('Success');
      }
  }
  return (
   <form className='register' onSubmit={register}>
    <h1>Register</h1>
    <input type="text" placeholder='User Name' value={username}
    onChange={ev=>{setusername(ev.target.value)}} required />
    <input type="password" placeholder='Password' value={userpass}
    onChange={ev=>{setuserpass(ev.target.value)}} required/>
    <button>Register</button>
   </form>
  )
}

export default Registerpage
