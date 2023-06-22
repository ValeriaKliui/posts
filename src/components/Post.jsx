import React from 'react'

const Post = ({ title, description, id, deletePost }) => {
    return (
        <div className="post">
            <div className="post__text">
                <p className="">
                    {id} {title}
                </p>
                <p className='description'>
                    {description}
                </p>
            </div>
            <div className="close" onClick={()=>deletePost(id)}>X</div>
        </div>)
}

export default Post