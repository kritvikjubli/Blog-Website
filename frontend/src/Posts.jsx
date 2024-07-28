import React from 'react'
import {formatISO9075} from "date-fns"
import { Link } from 'react-router-dom';

const Posts = ({_id,title,summ,cover,content,createdAt,author}) => {
  return (
    <div className="post">
            <div>
              <Link to={`/post/${_id}`}>
              <img className="img" src={'https://blog-website-51jr.onrender.com/'+cover} alt="" />
              </Link>
            </div>
            <div className="summary">
              <Link to={`/post/${_id}`}>
              <h2>{title}</h2>
              </Link>
              <p className="info">
                <a href="https://github.com/kritvikjubli/Blog-Website" className="author">{author.username}</a>
                <time>{formatISO9075(new Date(createdAt))}</time>
              </p>
              <p className="discp">{summ}</p>
            </div>
    </div>
  )
}

export default Posts
