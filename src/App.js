import {Routes , Route, useNavigate} from 'react-router-dom'
import Header from './Header';
import Feed from './Feed'; 
import Nav from './Nav'; 
import NewPost from './NewPost';
import Post from './Post';
import PostPage from './PostPage';
import Home from './Home';
import About from './About';
import Missing from './Missing';
import Footer from './Footer';
import { useEffect, useState } from 'react';
import {format} from 'date-fns';
import api from './api/posts';




function App() {

  const [posts , setPosts ] = useState([])
  const [postsRevert , setPostsRevert ] = useState([])

  // for new post 
  const [postTitle, setPostTitle] = useState();
  const [postBody, setPostBody] = useState();


  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const id = posts.length ? posts[posts.length - 1].id+1 : 1;
    const datetime = format(new Date(), 'MMMM dd , yyyy hh:mm');
    const newPost = {id,title:postTitle , datetime, body:postBody}

    try{
      const response = await api.post('/posts' , newPost);
      const allPosts = [...posts,response.data]
      setPosts(allPosts);
      setPostTitle('');
      setPostBody('');
      navigate(-1);

    }catch(err){
      console.log(`ERROR: ${err.message}}`);
    }
    

  }

  const handleBack = (id) => {
    navigate(-1);
  }

 

  useEffect(()=>{
    const fetchPosts = async () =>{
      try {
        const response = await api.get('/posts');
        setPosts((response.data));

      }catch(err){
        if(err.response){
          console.log(err.response.data);
        }else{
          console.log(`ERROR: ${err.message}`);
        }

       }
    }

    fetchPosts();
  },[]);

  

 

  return (
    <div className="App">
      <Header
        title = 'React Blog App'
      />

      <Nav

      />

      <Routes>
          <Route 
            exact path='/' 
            element={
              <Home 
                posts={posts }
              />
            } 
          />
          
          <Route 
            path="/post" 
            element={
              <NewPost 
                handleSubmit ={handleSubmit}
                postTitle={postTitle}
                setPostTitle={setPostTitle}
                postBody={postBody}
                setPostBody={setPostBody}
              />
            } 
          />

          <Route 
            path="/post/:id" 
            element={
              <PostPage 
                posts={posts}
                handleBack={handleBack}
              />
            } 
          />

          <Route path="/about" element={<About/>} />
          <Route path="*" element={<Missing/>} />
        
      </Routes>

      <Footer/>

    </div>
    
  );
}

export default App;
