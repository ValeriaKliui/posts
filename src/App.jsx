import { useState, useMemo, useEffect } from 'react'
import { nanoid } from 'nanoid'
import './App.css'
import PostsList from './components/PostsList'
import AddForm from './components/AddForm'
import Sort from './components/Sort'
import MyInput from './components/UI/input/MyInput'
import MyButton from './components/UI/button/MyButton'

function App() {
  const [posts, setPosts] = useState([])
  const [inputedInfo, setInputedInfo] = useState({ title: '', description: '' })
  const [searched, setSearched] = useState('');

  function handleChange(e) {
    if (e.target.name === 'searched') {
      setSearched(e.target.value);
    }
    else setInputedInfo({ ...inputedInfo, [e.target.name]: e.target.value })
  }

  function makeSorted(e) {
    setPosts([...posts].sort((a, b) => {
      return a[e].localeCompare(b[e])
    }))
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

  useEffect(() => {
    const cachedPosts = JSON.parse(localStorage.getItem('posts'));
    if (cachedPosts && posts.length < 1) localStorage.setItem('posts', JSON.stringify(cachedPosts))
    else localStorage.setItem('posts', JSON.stringify(posts));
  }, [posts])

  useEffect(() => {
    const cachedPosts = JSON.parse(localStorage.getItem('posts'));
    if (cachedPosts) {
      setPosts(cachedPosts);
    }
  }, [])

  function deletePost(id) {
    setPosts([...posts].filter((val, index) => {
      return id != index + 1;
    }))
  }

  function deleteAllPosts() {
    setPosts([]);
    localStorage.setItem('posts', JSON.stringify([]))
  }

  const searchedPosts = useMemo(
    () => {
      return posts.filter(p => p.title.includes(searched));
    }
    , [searched, inputedInfo, posts])

  return (
    <>
      <AddForm handleChange={handleChange} inputedInfo={inputedInfo} addNewPost={addNewPost}/>
      <MyInput className='search' type='text' placeholder='Search...' onChange={handleChange} value={searched} name='searched' />
      {searchedPosts.length ?
      <Sort makeSorted={makeSorted}/>
        :
        <p className='posts__text'>No posts!</p>
      }
      <PostsList posts={searchedPosts} deletePost={deletePost} />
      { searchedPosts.length>0 &&
      <div className='button_delete'>
      <MyButton onClick={deleteAllPosts}>Delete all :(</MyButton>
      </div>
      }
    </>
  )
}

export default App
