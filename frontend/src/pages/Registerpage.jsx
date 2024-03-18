import React from 'react'

const Registerpage = () => {
  return (
   <form className='register' action="">
    <h1>Register</h1>
    <input type="text" placeholder='User Name'/>
    <input type="password" placeholder='Password'/>
    <input type="password" placeholder='Confirm Password'/>
    <button>Register</button>
   </form>
  )
}

export default Registerpage