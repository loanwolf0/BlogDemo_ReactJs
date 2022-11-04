import React from 'react'
import Feed from './Feed'

const Home = ({posts}) => {
  return (
    <main className='Home'>

      {posts.length ? 
        (<Feed posts={posts} />)
        : (<h3 style={{marginTop:"50px" , marginLeft:"30px", fontSize:"30px"}} > No Post... </h3>)
      }
      
    </main>
  )
}

export default Home
