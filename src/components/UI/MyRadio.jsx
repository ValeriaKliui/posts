import React from 'react'

const MyRadio = ({makeSorted, setSortedType, ...props}) => {
    return (
        <>
            <input type='radio' {...props} onChange={(e)=>{setSortedType(props.value); makeSorted(e.target.value)}}/>
            <label htmlFor={props.id}>{props.label}</label>
        </>
    )
}

export default MyRadio