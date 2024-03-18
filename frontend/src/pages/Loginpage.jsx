import React from 'react'

const Loginpage = () => {
  return (
        <form className='login' action="">
            <h1>Login</h1>
            <input type="text" placeholder='User name' />
            <input type="password" placeholder='password' />
            <button>Login</button>
        </form>
  )
}

export default Loginpage