import React from 'react'
import classes from './MyInput.module.css'

const MyInput = ({className, ...props}) => {
  return (
    <input className={[classes.MyInput, className].join(' ')} {...props}/>
  )
}

export default MyInput