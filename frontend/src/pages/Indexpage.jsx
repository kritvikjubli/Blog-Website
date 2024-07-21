import React,{useEffect,useState} from 'react'
import Posts from '../Posts';

const Indexpage = () => {
  const [posts,setposts]=useState([])
  useEffect(()=>{
    fetch('http://localhost:4000/post').then(res=>{
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