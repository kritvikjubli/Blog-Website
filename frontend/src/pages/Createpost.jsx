import React ,{useState} from 'react'
import {Navigate} from 'react-router-dom'
import ReactQuill from "react-quill"
import "react-quill/dist/quill.snow.css"
const modules = {
  toolbar: [
    [{ 'header': [1, 2, false] }],
    ['bold', 'italic', 'underline','strike', 'blockquote'],
    [{'list': 'ordered'}, {'list': 'bullet'}, {'indent': '-1'}, {'indent': '+1'}],
    ['link', 'image'],
    ['clean']
  ]
};

const formats=[
  'header',
  'bold', 'italic', 'underline', 'strike', 'blockquote',
  'list', 'bullet', 'indent',
  'link', 'image'
]
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
      <ReactQuill value={content} onChange={newvalue=>setcontent(newvalue)} modules={modules} formats={formats}/>
      <button style={{marginTop:'5px'}}> Create Post</button>
    </form>
    </>
  )
}

export default Createpost