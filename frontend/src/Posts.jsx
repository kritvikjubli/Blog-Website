import React from 'react'
import {formatISO9075} from "date-fns"
const Posts = ({title,summ,cover,content,createdAt,author}) => {
  return (
    <div className="post">
            <div>
              <img className="img" src={'http://localhost:4000/'+cover} alt="" />
            </div>
            <div className="summary">
              <h2>{title}</h2>
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