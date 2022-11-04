import React, { useState } from 'react'
import { useParams, Link } from 'react-router-dom'


  const PostPage = ({posts, handleBack}) => {
  const {id} = useParams();
  const post = posts.find(post => (post.id).toString() === id);


  return (
    <main className='PostPage' >
      <article className='post' >
        {post && 
          <>
            <h2>{post.title}</h2>
            <p className='postDate' >{post.datetime}</p>
            <p className='postBody' >{post.body}</p>

            <button onClick={() => handleBack(post.id)} style= {{width:"100px" , letterSpacing:"1px"}}>
              Back
            </button>
          </>
        }

        {!post && 

          <>
            <h2>Post Not Found</h2>
            <p>No Problem , Here is our home page</p>
            <p>
              <Link to='/'>
                Visit Our Homepage
              </Link>
            </p>
          </>

        }
      </article>
    </main>
  )
}

export default PostPage
