import React, { useContext, useEffect} from 'react'
import { Link } from 'react-router-dom'
import { userContext } from './userContext';

const Header = () => {
  const {userinfo,setuserinfo} = useContext(userContext);
  useEffect(() => {
    fetch('https://blog-website-51jr.onrender.com/profile',{
      credentials: 'include',
    }).then(async(response) => {
      await response.json().then((userinfo)=>{
        setuserinfo(userinfo);
      });
    });
  },[]);

  const logout = () =>{
    fetch('https://blog-website-51jr.onrender.com/logout',{
      credentials: 'include',
      method: 'POST',
    });
    setuserinfo(null);
  }
  const username=userinfo?.username;

  return (
    <header>
    <Link to="/" className="logo">My Blog</Link>
    <nav>
      {username && (
        <>
        <span>Hello, {username} </span>
        <Link to='/create'>Create post</Link>
        <a onClick={logout}>logout</a>
        </>
      )}
      {!username&&(
        <>
        <Link to="/login">Login</Link>
        <Link to="/register">Register</Link>
        </>
      )}
    </nav>
  </header>
  )
}

export default Header
