import React,{useEffect,useState} from 'react'
import Posts from '../Posts';

const Indexpage = () => {
  const [posts,setposts]=useState([])
  useEffect(()=>{
    fetch('https://blog-website-51jr.onrender.com/post').then(res=>{
      res.json().then(posts=>{
        setposts(posts)
      })
    })
  },[]);
  return (
   <>
   {posts.length>0 && posts.map(post=>(
    <Posts {...post}/>
   ))}
   </>
  )
}

export default Indexpage
