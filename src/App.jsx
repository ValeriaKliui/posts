import { React, useState } from 'react'
import { nanoid } from 'nanoid'
import './App.css'
import PostsList from './components/PostsList'
import MyButton from './components/UI/MyButton'
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
      setPosts([...posts, {
        id: nanoid(),
        title: inputedInfo.title,
        description: inputedInfo.description
      }])
      setInputedInfo({ title: '', description: '' })
    }
  }

  function deletePost(id) {
    setPosts([...posts].filter((val, index) => {
      console.log(index+1, id)
      return id != index+1;
    }))
  }

  const searchedPosts = ()=>{
    return posts.filter(p=>p.title.includes(searched))
  }

  return (
    <>
      <PostsList posts={searchedPosts()} deletePost={deletePost} />
      <MyInput type='text' placeholder='Title' onChange={handleChange} value={inputedInfo.title} name='title' />
      <MyInput type='text' placeholder='Description' onChange={handleChange} value={inputedInfo.description} name='description' />
      <MyInput type='text' placeholder='Search...' onChange={handleChange} value={searched} name='searched' />

      <MyButton onClick={addNewPost} />
      {searchedPosts().length ? 
        <div>

          <MyRadio value='title' id='title' name='sort' label='title' makeSorted={makeSorted} setSortedType={setSortedType}/>
          <MyRadio value='description' id='description' name='sort' label='description' makeSorted={makeSorted} setSortedType={setSortedType}/>
        </div>
        : ''
      }
    </>
  )
}

export default App
