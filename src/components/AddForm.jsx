import React from 'react'
import MyButton from './UI/button/MyButton'
import MyInput from './UI/input/MyInput'

const AddForm = ({handleChange, inputedInfo, addNewPost}) => {
    return (
        <form className='add-form'>
            <MyInput type='text' placeholder='Title' onChange={handleChange} value={inputedInfo.title} name='title' />
            <MyInput type='text' placeholder='Description' onChange={handleChange} value={inputedInfo.description} name='description' />
            <MyButton onClick={addNewPost}>Add!</MyButton>
            </form>
    )
}

export default AddForm