import React ,{useEffect, useState} from 'react'
import {Navigate, useParams} from 'react-router-dom'
import Editor from '../Editor';
const Editpost = () => {
    const {id} =useParams();
    const [title,settitle]=useState('');
    const [summ,setsumm]=useState('');
    const [content,setcontent]=useState('');
    const [file,setfile]=useState('');
    const [rd,setrd]=useState(false);

    useEffect(()=>{
        fetch('https://blog-website-51jr.onrender.com/post/'+id).then(res=>{
            res.json().then(postinfo=>{
                settitle(postinfo.title);
                setsumm(postinfo.summ);
                setcontent(postinfo.content)
            })
        })
    },[])

    async function updatepost(ev){
        ev.preventDefault();
        const data=new FormData();
        data.set('title',title);
        data.set('summ',summ);
        data.set('content',content);
        data.set('id',id)
        if(file?.[0]){
            data.set('file',file?.[0]);
        }
        const res=await fetch("http://localhost:4000/post",{
            method:"PUT",
            body:data,
            credentials:'include',
        });
        if(res.ok){
            setrd(true);
        }
    }
    

    if(rd){
        return <Navigate to={'/post/'+id} />
      }
    return (
      <>
      <form onSubmit={updatepost} action="">
        <input type="title" placeholder={'Title'} value={title} onChange={ev=> settitle(ev.target.value)} required/>
        <input type="summary" placeholder={'Summary'} value={summ} onChange={ev=>setsumm(ev.target.value)} required />
        <input type="file" onChange={ev=>setfile(ev.target.files)}  />
        <Editor onChange={setcontent} value={content}/>
        <button style={{marginTop:'5px'}}> Update Post</button>
      </form>
      </>
    )
}

export default Editpost
