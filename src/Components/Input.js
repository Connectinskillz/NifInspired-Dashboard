import React from 'react'

const Input = (props) => {
  return (
    <div className='w-full ' >

        <input 
            type = {props.type}
            name = {props.name}
            placeholder = {props.placeholder}
            value = {props.value}
            onChange = {props.onChange}
            className={props.class}
            ref={props.refs}

            // you can add other props you need here
        />
    </div>
  )
}

export default Input