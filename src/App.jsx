import { useState, useMemo, useEffect } from 'react'
import { nanoid } from 'nanoid'
import './App.css'
import PostsList from './components/PostsList'
import MyButton from './components/UI/button/MyButton'
import MyInput from './components/UI/MyInput'
import MyRadio from './components/UI/MyRadio'

function App() {
  const [posts, setPosts] = useState([])
  const [inputedInfo, setInputedInfo] = useState({ title: '', description: '' })
  const [sortType, setSortedType] = useState('');
  const [searched, setSearched] = useState('');

  function handleChange(e) {
    if (e.target.name === 'searched') {
     setSearched(e.target.value);  
    }
    else setInputedInfo({ ...inputedInfo, [e.target.name]: e.target.value })
  }

  function makeSorted(e){
    setPosts([...posts].sort((a,b) => {
      return a[e].localeCompare(b[e])}))
  }

  function addNewPost() {
    if (inputedInfo.title || inputedInfo.description) {
      const newPost = {
        id: nanoid(),
        title: inputedInfo.title,
        description: inputedInfo.description
      };
      setPosts([...posts, newPost])
      setInputedInfo({ title: '', description: '' })
    }
  }

  useEffect(()=>{
    const cachedPosts = JSON.parse(localStorage.getItem('posts'));
    if (cachedPosts.length>0 && posts.length <1) localStorage.setItem('posts', JSON.stringify(cachedPosts))
    else localStorage.setItem('posts', JSON.stringify(posts));
  }, [posts])

  useEffect(()=>{
    const cachedPosts = JSON.parse(localStorage.getItem('posts'));
    if (cachedPosts.length>0){
      setPosts(cachedPosts);
    }
  }, [])

  function deletePost(id) {
    setPosts([...posts].filter((val, index) => {
      return id != index+1;
    }))
  }

  const searchedPosts = useMemo(
    ()=>{
      // if (localStorage.getItem('posts')) return JSON.parse(localStorage.getItem('posts'))
      return posts.filter(p=>p.title.includes(searched));
    }
  , [searched, inputedInfo, posts])
    
  return (
    <>
      <MyInput type='text' placeholder='Title' onChange={handleChange} value={inputedInfo.title} name='title' />
      <MyInput type='text' placeholder='Description' onChange={handleChange} value={inputedInfo.description} name='description' />
           <MyButton onClick={addNewPost} />
 <MyInput type='text' placeholder='Search...' onChange={handleChange} value={searched} name='searched' />
      {searchedPosts.length ? 
        <div>
          <MyRadio value='title' id='title' name='sort' label='title' makeSorted={makeSorted} setSortedType={setSortedType}/>
          <MyRadio value='description' id='description' name='sort' label='description' makeSorted={makeSorted} setSortedType={setSortedType}/>
        </div>
        : 
        <p>No posts!</p>
      }    
        <PostsList posts={searchedPosts} deletePost={deletePost} />
    </>
  )
}

export default App
