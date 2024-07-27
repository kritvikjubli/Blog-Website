import React ,{useState} from 'react'
import {Navigate} from 'react-router-dom'
import Editor from '../Editor'

const Createpost = () => {
  const [title,settitle]=useState('');
  const [summ,setsumm]=useState('');
  const [content,setcontent]=useState('');
  const [file,setfile]=useState('');
  const [rd,setrd]=useState(false);

    async function createnewpost(ev){
      ev.preventDefault();
      const data=new FormData();
      data.set('title',title);
      data.set('summ',summ);
      data.set('content',content);
      data.set('file',file[0]);
      const r=await fetch('http://localhost:4000/post',{
        method:'POST',
        body: data,
        credentials:'include',
      })
      if(r.ok){
        setrd(true);
      }
    }
    if(rd){
      return <Navigate to={'/'} />
    }
  return (
    <>
    <form onSubmit={createnewpost} action="">
      <input type="title" placeholder={'Title'} value={title} onChange={ev=> settitle(ev.target.value)} required/>
      <input type="summary" placeholder={'Summary'} value={summ} onChange={ev=>setsumm(ev.target.value)} required />
      <input type="file" required onChange={ev=>setfile(ev.target.files)}  />
      <Editor value={content} onchange={setcontent}/>
      <button style={{marginTop:'5px'}}> Create Post</button>
    </form>
    </>
  )
}

export default Createpost