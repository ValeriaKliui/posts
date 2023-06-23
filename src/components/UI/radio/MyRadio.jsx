import React from 'react'

const MyRadio = ({makeSorted, ...props}) => {
    return (
        <>
            <input type='radio' {...props} onChange={(e)=>{makeSorted(e.target.value)}}/>
            <label htmlFor={props.id}>{props.label}</label>
        </>
    )
}

export default MyRadio