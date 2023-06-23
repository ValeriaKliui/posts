import React from 'react'
import MyRadio from './UI/radio/MyRadio'

const Sort = ({makeSorted}) => {
    return (
        <div className='sort'>
            <MyRadio value='title' id='title' name='sort' label='title' makeSorted={makeSorted} />
            <MyRadio value='description' id='description' name='sort' label='description' makeSorted={makeSorted} />
        </div>
    )
}

export default Sort