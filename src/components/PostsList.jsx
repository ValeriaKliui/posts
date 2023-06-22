import { React, useState } from 'react'
import Post from './Post'

const PostsList = ({ posts, deletePost }) => {
    return (
        <div className='posts'>{
            posts.map((post, id) => {
                return (<Post title={post.title} description={post.description} id={id + 1} key={post.id} deletePost={deletePost} />)
            })
        }</div>
    )
}

export default PostsList